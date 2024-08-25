import { useCallback, useEffect, useRef } from 'react';
import { initAudio } from '../../utils/initAudio';
import { renderFrequencyGraph } from '../../utils/frequencyGraph';

type AudioInputVisualizerProps = {
  width: number;
  height: number;
  audioElement?: HTMLAudioElement;
  options?: {
    barGap?: number;
    redFactor?: number;
    greenFactor?: number;
    blueFactor?: number;
    borderRadius?: number;
    centered?: boolean;
  };
};

export const AudioVisualizer = ({
  width,
  height,
  audioElement,
  options = {},
}: AudioInputVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isAnimating = useRef(false);

  const handleAudioAnimation = useCallback(
    async (canvasElement: HTMLCanvasElement) => {
      if (!audioElement) {
        console.warn('No audio element provided');
        return;
      }

      isAnimating.current = true;

      const { analyser } = initAudio(audioElement);

      renderFrequencyGraph({
        analyser,
        canvasElement,
        canvasHeight: height,
        canvasWidth: width,
        options,
      });
    },
    [audioElement, height, width, options],
  );

  useEffect(() => {
    if (isAnimating.current) return;

    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    handleAudioAnimation(canvasElement);

    return () => {
      isAnimating.current = false;
    };
  }, [handleAudioAnimation]);

  return <canvas width={width} height={height} ref={canvasRef} />;
};