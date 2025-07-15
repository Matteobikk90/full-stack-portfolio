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
  const activeWork = data[activeSlide];

  // Work around for Firefox (Not working with motion)
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(activeWork);
  const isFirstRender = useRef(true);
  const previousSlide = useRef(activeSlide);
  useLayoutEffect(() => {
    const isInitial = isFirstRender.current;
    const hasChanged = previousSlide.current !== activeSlide;

    if (isInitial || !hasChanged) {
      isFirstRender.current = false;
      previousSlide.current = activeSlide;
      setCurrentSlide(activeWork);
      return;
    }

    setIsFadingOut(true);
    const timeoutId = setTimeout(() => {
      previousSlide.current = activeSlide;
      setCurrentSlide(activeWork);
      setIsFadingOut(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [activeSlide, activeWork]);

  useEffect(() => {
    const index = data.findIndex((p) => p.slug === slug);
    if (index !== -1 && index !== activeSlide) {
      setActiveSlide(index);
    }
  }, [slug, data, activeSlide, setActiveSlide]);

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
                {data.map(({ slug, title }) => (
                  <CarouselItem key={title}>
                    <figure className="overflow-hidden rounded-md border flex items-center justify-center">
                      <img
                        loading="lazy"
                        src={imageMap[slug!]}
                        alt={title}
                        className="w-full h-auto object-cover"
                      />
                    </figure>
                  </CarouselItem>
                ))}
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
