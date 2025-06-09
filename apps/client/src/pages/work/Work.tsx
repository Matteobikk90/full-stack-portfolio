import PopUpInfo from '@/components/pop-up-info';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/lib/ui/carousel';
import { useStore } from '@/stores';
import { imageMap } from '@/utils/slider';
import { ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { useLoaderData } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';

export const Work = () => {
  const { data } = useLoaderData({ from: '/work' });
  const { activeSlide } = useStore(
    useShallow((state) => ({
      activeSlide: state.activeSlide,
    }))
  );
  const activeWork = data[activeSlide];

  return (
    <main className="flex flex-col gap-4 md:gap-12 container mx-auto relative z-11 animate-fade-up flex-1">
      <h1 className="text-work">Work</h1>
      <section className="flex flex-col-reverse lg:grid grid-cols-1 lg:items-center lg:grid-cols-2 xl:grid-cols-[35rem_1fr] gap-12">
        <AnimatePresence mode="wait">
          <motion.article
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="space-y-2"
          >
            <h2 className="lg:text-9xl text-5xl leading-none text-outline font-medium">
              {activeWork.number}
            </h2>
            <h3 className="font-medium">{activeWork.title}</h3>
            <p>{activeWork.description}</p>
            <ul key={activeSlide} className="flex flex-wrap gap-2 text-xs">
              {activeWork.technologies.map((tech, index) => (
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
            <div className="flex gap-2">
              {activeWork.demoUrl && (
                <a
                  href={activeWork.demoUrl}
                  className="bg-gray hover:text-work max-w-max p-3 flex rounded-full"
                >
                  <PopUpInfo hoverText="Live demo" align="right">
                    <ArrowUpRightIcon className="size-5" weight="duotone" />
                  </PopUpInfo>
                </a>
              )}
              {activeWork.repoUrl && (
                <a
                  href={activeWork.repoUrl}
                  className="bg-gray hover:text-work max-w-max p-3 flex rounded-full"
                >
                  <PopUpInfo hoverText="View on GitHub" align="center">
                    <GithubLogoIcon className="size-5" weight="duotone" />
                  </PopUpInfo>
                </a>
              )}
            </div>
          </motion.article>
        </AnimatePresence>
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
    </main>
  );
};
