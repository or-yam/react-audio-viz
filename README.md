# React-viz-audio

![demo animation](./.github/assets/demo.gif)

Audio visualizer for audio samples in React

Supported sources: HTML Audio Element, Audio File (src), Audio Media devices (microphone)

![NPM Version](https://img.shields.io/npm/v/viz-audio)
![NPM License](https://img.shields.io/npm/l/viz-audio)

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
        <AudioVisualizer height={300} width={400} audioSource={audioElement} />
      )}
    </>
  );
}
```

### With audio file src

```tsx
import { AudioVisualizer } from 'viz-audio';

export default function App() {
  return (
    <AudioVisualizer height={300} width={400} audioSource={'./demo.mp3'} />
  );
}
```

## Props

- `barGap` - Gap between the graph's bars, in pixels. `number`

  `10` Gap
  ![large gap demo](./.github/assets/image-7.png)

  `0` No gap
  ![no gap demo](./.github/assets/image-8.png)

- `borderRadius` - Corner radius of the graph's bars, in pixels. `number`

  `0` Radius
  ![no radius demo](./.github/assets/image-6.png)

- `centered` - Whether the graph should be centered. `boolean`

  `true` - The graph will be centered.
  ![centered demo](./.github/assets/image-2.png)
  `false` - The graph will not be centered.
  ![not centered demo](./.github/assets/image-1.png)

- Colors

Each bar gets a solid rgb color, based on the bar's height and its index. You can change the color of the bars by setting the `redFactor`, `greenFactor` and `blueFactor` props.

> 🚧 Plan to add more options in the future to customize the color of the bars.

- `redFactor` - Red amount of the color of the graph's bars. `number`
- `greenFactor` - Green amount of the color of the graph's bars. `number`
- `blueFactor` - Blue amount of the color of the graph's bars. `number`

Examples

- redFactor: 5, greenFactor: 250, blueFactor: 170
  ![default colors demo](./.github/assets/image-3.png)
- redFactor: 500, greenFactor: 500, blueFactor: 200
  ![yelowish colors demo](./.github/assets/image-5.png)
- redFactor: 100, greenFactor: 100, blueFactor: 100
  ![brownish colors demo](./.github/assets/image-4.png)
