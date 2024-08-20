export const renderFrequencyGraph = ({
  analyser,
  canvasContext,
  audioContext,
  canvasWidth,
  canvasHeight,
}: {
  analyser: AnalyserNode;
  canvasContext: CanvasRenderingContext2D;
  audioContext: AudioContext;
  canvasWidth: number;
  canvasHeight: number;
}) => {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const barWidth = canvasWidth / bufferLength;

  const barGap = 6;
  const redFactor = 5;
  const greenFactor = 250;
  const blueFactor = 170;
  const borderRadius = 20;
  const centered = true;

  requestAnimationFrame(() => {
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
    renderFrequencyGraph({
      analyser,
      canvasContext,
      audioContext,
      canvasWidth,
      canvasHeight,
    });
  });

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
    canvasContext.roundRect(rectX, rectY, barWidth, barHeight, [borderRadius]);
    canvasContext.fill();

    rectX += barWidth + barGap;
  });
};
