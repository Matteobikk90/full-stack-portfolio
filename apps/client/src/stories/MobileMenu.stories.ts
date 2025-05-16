import { MenuMobile } from '@/components/menu/mobile';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MenuMobile> = {
  title: 'Components/MenuMobile',
  tags: ['autodocs'],
  component: MenuMobile,
};
export default meta;

type Story = StoryObj<typeof MenuMobile>;

export const Default: Story = {};
