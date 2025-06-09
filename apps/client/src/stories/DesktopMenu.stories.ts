import MenuDesktop from '@/components/menu/desktop';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MenuDesktop> = {
  title: 'Components/MenuDesktop',
  component: MenuDesktop,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof MenuDesktop>;

export const Default: Story = {};
