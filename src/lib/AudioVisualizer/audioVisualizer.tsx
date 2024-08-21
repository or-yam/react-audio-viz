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

  const audioInit = useCallback(
    async (canvasContext: CanvasRenderingContext2D) => {
      if (!audioElement) return;

      isAnimating.current = true;
      const { analyser, audioContext } = await initAudio(audioElement);

      renderFrequencyGraph({
        analyser,
        audioContext,
        canvasContext,
        canvasHeight: height,
        canvasWidth: width,
        options,
      });
    },
    [audioElement, height, width, options],
  );

  useEffect(() => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) return;
    if (isAnimating.current) return;

    audioInit(canvasContext);
    return () => {
      isAnimating.current = false;
    };
  }, [audioInit]);

  return <canvas width={width} height={height} ref={canvasRef} />;
};
