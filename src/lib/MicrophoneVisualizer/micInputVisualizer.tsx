import { useCallback, useEffect, useRef, useState } from 'react';
import { initMicrophone } from '../../utils/initMicrophone';
import { renderFrequencyGraph } from '../../utils/frequencyGraph';

type MicrophoneInputVisualizerProps = {
  width: number;
  height: number;
  options?: {
    barGap?: number;
    redFactor?: number;
    greenFactor?: number;
    blueFactor?: number;
    borderRadius?: number;
    centered?: boolean;
  };
};

/**
   * A React component that renders a visual representation of microphone
   * input audio data, using HTML canvas.
   * @component
   * @description
   * @example
   */
export const MickInputVisualizer = ({
  width,
  height,
  options = {},
}: MicrophoneInputVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isAnimating = useRef(false);
  const [isMicAvailable, setIsMicAvailable] = useState(false);

  const handleMicrophonePermission = async () => {
    try {
      navigator.mediaDevices.getUserMedia({ audio: true });
      setIsMicAvailable(true);
    } catch (err) {
      setIsMicAvailable(false);
      console.error(err);
    }
  };

  const handleMicrophoneAnimation = useCallback(
    async (canvasElement: HTMLCanvasElement) => {
      const { analyser } = await initMicrophone();
      isAnimating.current = true;
      renderFrequencyGraph({
        analyser,
        canvasElement,
        canvasHeight: height,
        canvasWidth: width,
        options,
      });
    },
    [height, width, options],
  );

  useEffect(() => {
    if (isAnimating.current) return;
    if (!isMicAvailable) {
      handleMicrophonePermission();
      return;
    }

    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    handleMicrophoneAnimation(canvasElement);

    return () => {
      isAnimating.current = false;
    };
  }, [isMicAvailable, handleMicrophoneAnimation]);

  return <canvas width={width} height={height} ref={canvasRef} />;
};
