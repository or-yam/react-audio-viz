/* vite static file import */
import processorUrl from './processor?url';

export const initMicrophone = async () => {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  let micStream: MediaStream;

  await audioContext.audioWorklet.addModule(processorUrl);
  const processor = new AudioWorkletNode(audioContext, 'processor');

  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    console.log(err);
    window.alert('You must give access to your mic in order to proceed');
    throw err;
  }

  const mediaElementSource = audioContext.createMediaStreamSource(micStream);
  mediaElementSource.connect(processor);

  mediaElementSource.connect(analyser);
  analyser.fftSize = 2 ** 8;

  return { analyser, audioContext };
};
