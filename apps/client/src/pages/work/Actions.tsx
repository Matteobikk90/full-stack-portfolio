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
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const Actions = ({
  activeWork,
}: {
  activeWork: Pick<WorkTypes, 'id' | 'demoUrl' | 'repoUrl'>;
}) => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const toggleModal = useStore((state) => state.toggleModal);
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

      toast.success(
        serverData.hasLiked ? t('like.success') : t('like.removed'),
        {
          description: serverData.hasLiked
            ? t('like.success_description')
            : t('like.removed_description'),
          duration: toastDuration,
        }
      );
    },
    onError: (err) => {
      toast.error(t('like.error'), {
        description: err?.message || t('like.error_description'),
        duration: toastDuration,
      });
    },
  });

  const handleClick = () =>
    isAuthenticated ? mutate(activeWork.id) : toggleModal();

  const likesCount = likeData?.likesCount ?? likeStatus?.likesCount ?? 0;
  const hasLiked = likeData?.hasLiked ?? likeStatus?.hasLiked ?? false;

  return (
    <div className="flex gap-2 w-full">
      {activeWork.demoUrl && (
        <PopUpInfo hoverText={t('live')} align="right">
          <a
            target="_blank"
            href={activeWork.demoUrl}
            className="bg-gray hover:text-work max-w-max p-3 flex rounded-full"
          >
            <ArrowUpRightIcon className="size-5" weight="duotone" />
          </a>
        </PopUpInfo>
      )}
      {activeWork.repoUrl && (
        <PopUpInfo hoverText={t('source')} align="center">
          <a
            target="_blank"
            href={activeWork.repoUrl}
            className="bg-gray hover:text-work max-w-max p-3 flex rounded-full"
          >
            <GithubLogoIcon className="size-5" weight="duotone" />
          </a>
        </PopUpInfo>
      )}
      <PopUpInfo
        hoverText={
          isAuthenticated
            ? hasLiked
              ? t('like.remove_popup')
              : t('like.popup')
            : t('login_like')
        }
        className="ml-auto"
        align="left"
      >
        <Button
          onClick={handleClick}
          className="flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed !p-0"
          variant="ghost"
          sound={hasLiked ? 'like' : 'click'}
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
