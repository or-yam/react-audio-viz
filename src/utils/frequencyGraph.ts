type RenderFrequencyGraphOptions = {
  barGap?: number;
  redFactor?: number;
  greenFactor?: number;
  blueFactor?: number;
  borderRadius?: number;
  centered?: boolean;
};

type RenderFrequencyGraphArgs = {
  analyser: AnalyserNode;
  canvasElement: HTMLCanvasElement;
  canvasWidth: number;
  canvasHeight: number;
  options?: RenderFrequencyGraphOptions;
};

export const renderFrequencyGraph = ({
  analyser,
  canvasElement,
  canvasWidth,
  canvasHeight,
  options = {},
}: RenderFrequencyGraphArgs) => {
  const {
    barGap = 6,
    redFactor = 5,
    greenFactor = 250,
    blueFactor = 170,
    borderRadius = 20,
    centered = true,
  } = options;

  const canvasContext = canvasElement.getContext(
    '2d',
  ) as CanvasRenderingContext2D;
  const animate = ({
    analyser,
    canvasContext,
  }: {
    analyser: AnalyserNode;
    canvasContext: CanvasRenderingContext2D;
  }) => {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = canvasWidth / bufferLength;

    analyser.getByteFrequencyData(dataArray);

    let rectX = 0;

    dataArray.forEach((barHeight, index) => {
      const rectY = centered
        ? (canvasHeight - barHeight) / 2
        : canvasHeight - barHeight;
      const r = barHeight + redFactor * (index / bufferLength);
      const g = greenFactor * (index / bufferLength);
      const b = blueFactor;
      canvasContext.fillStyle = `rgb(${r}, ${g}, ${b})`;

      canvasContext.beginPath();
      canvasContext.roundRect(rectX, rectY, barWidth, barHeight, [
        borderRadius,
      ]);
      canvasContext.fill();

      rectX += barWidth + barGap;
    });

    requestAnimationFrame(() => {
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
      animate({ analyser, canvasContext });
    });
  };

  animate({ analyser, canvasContext });
};
