import { ScrollContainer } from '@/components/scroll-container';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/lib/ui/carousel';
import { Actions } from '@/pages/work/Actions';
import { useStore } from '@/stores';
import { imageMap } from '@/utils/slider';
import { useLoaderData, useParams } from '@tanstack/react-router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

export const Work = () => {
  const { t } = useTranslation();
  const { data } = useLoaderData({ from: '/work/$slug' });
  const { slug } = useParams({ from: '/work/$slug' });
  const { activeSlide, setActiveSlide } = useStore(
    useShallow(({ activeSlide, setActiveSlide }) => ({
      activeSlide,
      setActiveSlide,
    }))
  );
  const routeSlide = data.findIndex((project) => project.slug === slug);
  const selectedSlide = routeSlide === -1 ? activeSlide : routeSlide;
  const activeWork = data[selectedSlide];

  // Work around for Firefox (Not working with motion)
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(activeWork);
  const [loadedSlides, setLoadedSlides] = useState(
    () => new Set<number>([selectedSlide])
  );
  const isFirstRender = useRef(true);
  const previousSlide = useRef(selectedSlide);
  useLayoutEffect(() => {
    const isInitial = isFirstRender.current;
    const hasChanged = previousSlide.current !== selectedSlide;

    if (isInitial || !hasChanged) {
      isFirstRender.current = false;
      previousSlide.current = selectedSlide;
      setCurrentSlide(activeWork);
      return;
    }

    setIsFadingOut(true);
    const timeoutId = setTimeout(() => {
      previousSlide.current = selectedSlide;
      setCurrentSlide(activeWork);
      setIsFadingOut(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [selectedSlide, activeWork]);

  useEffect(() => {
    setLoadedSlides((loaded) => {
      if (loaded.has(selectedSlide)) return loaded;

      const next = new Set(loaded);
      next.add(selectedSlide);
      return next;
    });
  }, [selectedSlide]);

  useEffect(() => {
    if (selectedSlide !== activeSlide) {
      setActiveSlide(selectedSlide);
    }
  }, [selectedSlide, activeSlide, setActiveSlide]);

  return (
    <main className="flex flex-col gap-4 md:gap-12 p-4">
      <h1 className="text-work">{t('work.title')}</h1>
      <ScrollContainer className="flex-1 min-h-0" backgroundColor="bg-work">
        <section className="flex flex-col-reverse lg:grid grid-cols-1 items-center xl:items-start lg:grid-cols-2 xl:grid-cols-[35rem_1fr] gap-12 flex-1 min-h-0">
          <article
            className={`transition-opacity duration-1000 space-y-2 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
          >
            <h2 className="lg:text-9xl text-5xl leading-none text-outline font-medium">
              {currentSlide.number}
            </h2>
            <h3 className="font-medium">{currentSlide.title}</h3>
            <p>{t(`work.${currentSlide.slug}.description`)}</p>
            <ul
              key={currentSlide.slug}
              className="flex flex-wrap gap-2 text-xs"
            >
              {currentSlide.technologies.map((tech, index) => (
                <li
                  key={tech}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="bg-gray text-work p-2 rounded-md animate-fade-up"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <hr className="my-4 border-work" />
            <Actions activeWork={currentSlide} />
          </article>
          <article>
            <Carousel className="relative flex flex-col space-y-8">
              <CarouselContent>
                {data.map(({ slug, title }, index) => {
                  const image = imageMap[slug!];
                  const isActive = index === selectedSlide;

                  return (
                    <CarouselItem key={title}>
                      <figure
                        className="overflow-hidden rounded-md border flex items-center justify-center"
                        style={{ aspectRatio: `${image.width} / ${image.height}` }}
                      >
                        {loadedSlides.has(index) && (
                          <img
                            loading={isActive ? 'eager' : 'lazy'}
                            fetchPriority={isActive ? 'high' : 'auto'}
                            src={image.src}
                            srcSet={image.srcSet}
                            sizes="(min-width: 1024px) 50vw, calc(100vw - 2rem)"
                            width={image.width}
                            height={image.height}
                            alt={title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </figure>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="flex w-full gap-4 max-w-max relative mx-auto">
                <CarouselPrevious className="bg-work w-10 h-10" />
                <CarouselNext className="bg-work w-10 h-10" />
              </div>
            </Carousel>
          </article>
        </section>
      </ScrollContainer>
    </main>
  );
};
