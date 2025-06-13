import PopUpInfo from '@/components/pop-up-info';
import { queryClient } from '@/config/queryClient';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/lib/ui/button';
import { getLikes, toggleLike } from '@/queries/likes';
import { useStore } from '@/stores';
import type { LikeType } from '@/types/likes.types';
import type { WorkTypes } from '@/types/works.types';
import { toastDuration } from '@/utils/constants';
import {
  ArrowUpRightIcon,
  GithubLogoIcon,
  HeartIcon,
} from '@phosphor-icons/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';

export const Actions = ({
  activeWork,
}: {
  activeWork: Pick<WorkTypes, 'id' | 'demoUrl' | 'repoUrl'>;
}) => {
  const { isAuthenticated } = useAuth();
  const { toggleModal } = useStore(
    useShallow(({ toggleModal }) => ({
      toggleModal,
    }))
  );
  const { data: likeStatus } = useQuery({
    queryKey: ['likeStatus', activeWork.id],
    queryFn: () => getLikes(activeWork.id),
    enabled: !!activeWork.id,
  });
  const { data: likeData, mutate } = useMutation({
    mutationKey: ['toggleLike', activeWork.id],
    mutationFn: toggleLike,
    onSuccess: (serverData, projectId) => {
      queryClient.setQueryData<LikeType>(['likeStatus', projectId], serverData);

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

  const handleIconClick = () =>
    isAuthenticated ? mutate(activeWork.id) : toggleModal();

  const likesCount = likeStatus?.likesCount ?? likeData?.likesCount ?? 0;
  const hasLiked = likeStatus?.hasLiked ?? likeData?.hasLiked ?? false;

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
          onClick={handleIconClick}
          className="flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed !p-0"
          variant="ghost"
        >
          <HeartIcon
            weight={hasLiked ? 'fill' : 'regular'}
            className="text-work size-5"
          />
          {likesCount}
        </Button>
      </PopUpInfo>
    </div>
  );
};
