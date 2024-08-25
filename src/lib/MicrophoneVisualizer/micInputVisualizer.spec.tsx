import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MickInputVisualizer } from './micInputVisualizer';

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
    createMediaStreamSource: vi.fn().mockImplementation(() => ({
      connect: vi.fn(),
    })),
    audioWorklet: {
      addModule: vi.fn(),
    },
  };
});

const AudioWorkletNode = vi.fn().mockImplementation(() => {
  return {
    connect: vi.fn(),
  };
});

const navigator = {
  mediaDevices: {
    getUserMedia: vi.fn(),
  },
};

vi.stubGlobal('navigator', navigator);
vi.stubGlobal('AudioContext', AudioContext);
vi.stubGlobal('AudioWorkletNode', AudioWorkletNode);

describe('AudioVisualizer component', () => {
  it('renders correctly', () => {
    render(<MickInputVisualizer width={300} height={300} />);

    const canvas = screen.getByText(
      (_, element) => element?.tagName === 'CANVAS',
    );

    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '300');
    expect(canvas).toHaveAttribute('height', '300');
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled();
    expect(AudioContext).toHaveBeenCalled();
  });
});
