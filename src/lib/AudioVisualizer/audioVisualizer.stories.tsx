import audioUrl from '../../demo-app/Pokémon.mp3?url';
import type { Meta, StoryObj } from '@storybook/react';
import { AudioVisualizer } from './index';
import { ComponentProps, useState } from 'react';

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

const Demo = (
  args: Omit<ComponentProps<typeof AudioVisualizer>, 'audioElement'>,
) => {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null,
  );

  return (
    <>
      <audio controls src={audioUrl} ref={setAudioElement}></audio>
      {audioElement && (
        <AudioVisualizer audioElement={audioElement} {...args} />
      )}
    </>
  );
};

export const Centered: Story = {
  args: { width: 400, height: 400 },
  render: (args) => <Demo {...args} />,
};

export const Floored: Story = {
  args: { width: 400, height: 400, options: { centered: false } },
  render: (args) => <Demo {...args} />,
};
