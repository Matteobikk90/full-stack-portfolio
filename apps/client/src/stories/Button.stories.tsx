import type { Meta, StoryObj } from '@storybook/react';
import '@/index.css';
import { Button } from '@/lib/ui/button';

const meta: Meta<typeof Button> = {
  title: 'UI/Buttons',
  component: Button,
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    variant: {
      name: 'Variant',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
      type: 'string',
      control: { type: 'select' },
    },
  },
  args: {
    children: 'Click me',
    variant: 'default',
    size: 'default',
  },
};
