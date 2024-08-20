import type { Meta, StoryObj } from '@storybook/react';
import { AudioVisualizer } from './index';

const meta = {
  title: 'AudioVisualizer',
  component: AudioVisualizer,
  parameters: {},
  tags: [],
  argTypes: {},
  args: { height: 300, width: 300 },
} satisfies Meta<typeof AudioVisualizer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    height: 300,
    width: 300,
  },
};
