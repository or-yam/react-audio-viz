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
    }
  };

  const microphoneInit = useCallback(
    async (canvasContext: CanvasRenderingContext2D) => {
      const { analyser, audioContext } = await initMicrophone();
      isAnimating.current = true;
      renderFrequencyGraph({
        analyser,
        audioContext,
        canvasContext,
        canvasHeight: height,
        canvasWidth: width,
        options,
      });
    },
    [height, width, options],
  );

  useEffect(() => {
    if (!isMicAvailable) handleMicrophonePermission();

    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) return;

    microphoneInit(canvasContext);

    return () => {
      isAnimating.current = false;
    };
  }, [isMicAvailable, microphoneInit]);

  return <canvas width={width} height={height} ref={canvasRef} />;
};
