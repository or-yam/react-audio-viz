# React-viz-audio

Audio visualizer for audio samples in React

## Installation

```sh
npm install viz-audio
```

## Usage

### With microphone input

```tsx
import { MickInputVisualizer } from 'viz-audio';

export default function App() {
  return <MickInputVisualizer height={300} width={400} />;
}
```

### With audio element

```tsx
import { AudioVisualizer } from 'viz-audio';

export default function App() {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null,
  );

  return (
    <>
      <audio controls src="demo.mp3" ref={setAudioElement}></audio>
      {audioElement && (
        <AudioVisualizer height={300} width={400} audioElement={audioElement} />
      )}
    </>
  );
}
```
