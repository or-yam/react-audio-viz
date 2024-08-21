import type { Meta, StoryObj } from '@storybook/react';
import { MickInputVisualizer } from './index';

const meta = {
  title: 'MickInputVisualizer',
  component: MickInputVisualizer,
  parameters: {},
  tags: [],
  argTypes: {},
  args: { height: 300, width: 300 },
} satisfies Meta<typeof MickInputVisualizer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Centered: Story = {
  args: {
    height: 300,
    width: 300,
  },
};

export const Floored: Story = {
  args: {
    height: 300,
    width: 300,
    options: { centered: false },
  },
};
