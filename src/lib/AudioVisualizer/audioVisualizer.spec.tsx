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

describe('AudioVisualizer component', () => {
  const audioElement = document.createElement('audio');

  it('renders correctly', () => {
    render(<AudioVisualizer width={300} height={300} />);

    const canvas = screen.getByText(
      (_, element) => element?.tagName === 'CANVAS',
    );

    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '300');
    expect(canvas).toHaveAttribute('height', '300');
  });

  it('renders with audio element', () => {
    render(
      <AudioVisualizer width={300} height={300} audioElement={audioElement} />,
    );
    expect(AudioContext).toHaveBeenCalled();
  });
});
