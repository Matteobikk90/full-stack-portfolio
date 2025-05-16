import ParticlesBackground from '@/components/particles';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ParticlesBackground> = {
  title: 'Components/ParticlesBackground',
  component: ParticlesBackground,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof ParticlesBackground>;

export const Default: Story = {
  render: () => (
    <div className="relative w-screen h-screen bg-white">
      <ParticlesBackground />
    </div>
  ),
};
