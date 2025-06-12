import PopUpInfo from '@/components/pop-up-info';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/lib/ui/button';
import { toggleLike } from '@/queries/likes';
import type { WorkTypes } from '@/types/works.types';
import { toastDuration } from '@/utils/constants';
import {
  ArrowUpRightIcon,
  GithubLogoIcon,
  HeartIcon,
} from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const Actions = ({
  activeWork,
}: {
  activeWork: Pick<WorkTypes, 'id' | 'demoUrl' | 'repoUrl'>;
}) => {
  const { isAuthenticated } = useAuth();
  const { data: likeData, mutate } = useMutation({
    mutationKey: ['toggleLike', activeWork.id],
    mutationFn: toggleLike,
    onSuccess: ({ hasLiked }) => {
      toast.success(hasLiked ? 'Thanks for the ❤️' : 'Like removed', {
        description: hasLiked
          ? 'Your appreciation has been recorded.'
          : 'You can like it again any time.',
        duration: toastDuration,
      });
    },
    onError: () => {
      toast.error('Couldn’t send like', {
        description: 'Check your connection and try again.',
        duration: toastDuration,
      });
    },
  });

  return (
    <div className="flex gap-2 w-full">
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
      <PopUpInfo
        hoverText={isAuthenticated ? 'Like this project' : 'Login to like'}
        className="ml-auto"
      >
        <Button
          onClick={() => mutate(activeWork.id)}
          className="flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          variant="ghost"
        >
          <HeartIcon
            weight={likeData?.hasLiked ? 'fill' : 'regular'}
            className="text-work size-5"
          />
          {likeData?.likesCount}
        </Button>
      </PopUpInfo>
    </div>
  );
};
