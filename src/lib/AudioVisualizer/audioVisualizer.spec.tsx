import audioUrl from '../../demo-app/Pokémon.mp3?url';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AudioVisualizer } from './audioVisualizer';

const AudioContext = vi.fn().mockImplementation(() => {
  return {
    createAnalyser: vi.fn().mockImplementation(() => ({
      connect: vi.fn(),
      getByteFrequencyData: vi.fn(),
      fftSize: 2 ** 8,
    })),
    createMediaElementSource: vi.fn().mockImplementation(() => ({
      connect: vi.fn(),
    })),
  };
});

vi.stubGlobal('AudioContext', AudioContext);

window.HTMLMediaElement.prototype.pause = vi.fn();
window.HTMLMediaElement.prototype.play = vi.fn();

describe('AudioVisualizer component', () => {
  const audioElement = document.createElement('audio');

  it('renders correctly', () => {
    render(<AudioVisualizer width={300} height={300} audioSource={audioUrl} />);

    const canvas = screen.getByText(
      (_, element) => element?.tagName === 'CANVAS',
    );

    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '300');
    expect(canvas).toHaveAttribute('height', '300');
    expect(AudioContext).toHaveBeenCalled();
  });

  it('renders with audio element', () => {
    render(
      <AudioVisualizer width={300} height={300} audioSource={audioElement} />,
    );
    expect(AudioContext).toHaveBeenCalled();
  });
});
