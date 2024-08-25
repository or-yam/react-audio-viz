export const initAudio = (audioElement: HTMLAudioElement) => {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const mediaElementSource =
    audioContext.createMediaElementSource(audioElement);
  analyser.connect(audioContext.destination);

  mediaElementSource.connect(analyser);
  analyser.fftSize = 2 ** 8;

  return { analyser, audioContext };
};
