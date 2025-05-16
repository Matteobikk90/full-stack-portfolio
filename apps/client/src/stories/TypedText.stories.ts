import TypedText from '@/components/typed-text';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TypedText> = {
  title: 'components/TypedText',
  component: TypedText,
  tags: ['autodocs'],
  args: {
    text: [
      'React, TypeScript, Node.js, Prisma.',
      'Testing, Design Systems, CI/CD.',
      'Made with ❤️ in Italy.',
    ],
  },
};
export default meta;

type Story = StoryObj<typeof TypedText>;

export const Default: Story = {};
