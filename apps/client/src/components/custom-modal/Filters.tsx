import PopUpInfo from '@/components/pop-up-info';
import { ScrollContainer } from '@/components/scroll-container';
import { Button } from '@/lib/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/lib/ui/command';
import { DialogDescription } from '@/lib/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/ui/popover';
import { cn } from '@/lib/utils';
import { useStore } from '@/stores';
import type { FilterKey } from '@/types/filters.types';
import { categoryColorClasses, filterConfig } from '@/utils/filters';
import { InfoIcon } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

export const Filters = () => {
  const { t } = useTranslation();
  const {
    filters,
    category,
    categoryOpen,
    valueOpen,
    setCategory,
    toggleCategoryOpen,
    toggleValueOpen,
    setFilter,
    removeValue,
    resetAll,
    toggleModal,
  } = useStore(
    useShallow((state) => ({
      ...state,
    }))
  );

  const selectedValues = category ? filters[category] || [] : [];

  const toggleValue = (val: string) => {
    if (!category) return;

    const updated = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];

    setFilter(category, updated);
  };

  return (
    <>
      <DialogDescription className="text-sm flex items-center gap-4 justify-between">
        {t('search.description')}
        <Button variant="ghost" className="p-0">
          <PopUpInfo
            hoverText={t('search.info')}
            align="left"
            className="gap-2"
            wrapText
          >
            <InfoIcon weight="duotone" className="size-5" />
          </PopUpInfo>
        </Button>
      </DialogDescription>

      <div className="flex flex-col gap-4">
        <Popover open={categoryOpen} onOpenChange={toggleCategoryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="justify-between"
            >
              {category
                ? filterConfig[category].label
                : `${t('search.select_category')}`}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-background">
            <Command>
              <CommandInput placeholder={t('search.category')} />
              <CommandList>
                {Object.entries(filterConfig).map(([key, config]) => (
                  <CommandItem
                    key={key}
                    value={key}
                    onSelect={() => {
                      setCategory(key as FilterKey);
                      toggleCategoryOpen(false);
                    }}
                  >
                    {config.label}
                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        category === key ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {category && (
          <>
            <Popover open={valueOpen} onOpenChange={toggleValueOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between"
                >
                  {selectedValues.length > 0
                    ? `${selectedValues.length} ${t('search.selected')}`
                    : `${t('search.select')} ${filterConfig[category].label}...`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 bg-background">
                <Command>
                  <CommandInput placeholder={t('search.value')} />
                  <CommandList>
                    <CommandEmpty className="p-2.5">
                      {t('search.no_results')}
                    </CommandEmpty>{' '}
                    <ScrollContainer className="max-h-64">
                      <CommandGroup>
                        {filterConfig[category].options.map((option) => (
                          <CommandItem
                            key={option}
                            value={option}
                            onSelect={() => toggleValue(option)}
                          >
                            {option}
                            <Check
                              className={cn(
                                'ml-auto h-4 w-4',
                                selectedValues.includes(option)
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </ScrollContainer>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(filters).flatMap(([key, vals]) =>
                vals.map((val) => (
                  <Button
                    key={`${key}-${val}`}
                    onClick={() => removeValue(key as FilterKey, val)}
                    className={cn(
                      'gap-1 rounded-md px-3 py-1 text-xs shadow-sm hover:opacity-80',
                      categoryColorClasses[key as FilterKey]
                    )}
                  >
                    {val}
                  </Button>
                ))
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button onClick={resetAll}>{t('clear')}</Button>
              {!category || selectedValues.length === 0 ? (
                <Button disabled>{t('confirm')}</Button>
              ) : (
                <Button asChild>
                  <Link
                    onClick={() => toggleModal(null)}
                    to="/search"
                    search={filters}
                  >
                    {t('confirm')}
                  </Link>
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
