import './app.css';
import { useState } from 'react';
import { AudioVisualizer, MickInputVisualizer } from '../lib/index';

export default function App() {
  const [componentToShow, setComponentToShow] = useState<
    null | 'mic' | 'element' | 'src'
  >(null);

  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null,
  );

  const [barGap, setBarGap] = useState(6);
  const [redFactor, setRedFactor] = useState(5);
  const [greenFactor, setGreenFactor] = useState(250);
  const [blueFactor, setBlueFactor] = useState(170);
  const [borderRadius, setBorderRadius] = useState(20);
  const [centered, setCentered] = useState(true);

  const optionsMenu = () => {
    return (
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100vw',
          height: 'max-content',
        }}
      >
        <label>
          barGap
          <input
            type="number"
            value={barGap}
            onChange={(e) => setBarGap(e.target.valueAsNumber)}
          />
        </label>
        <label>
          redFactor
          <input
            type="number"
            value={redFactor}
            onChange={(e) => setRedFactor(e.target.valueAsNumber)}
          />
        </label>
        <label>
          greenFactor
          <input
            type="number"
            value={greenFactor}
            onChange={(e) => setGreenFactor(e.target.valueAsNumber)}
          />
        </label>
        <label>
          blueFactor
          <input
            type="number"
            value={blueFactor}
            onChange={(e) => setBlueFactor(e.target.valueAsNumber)}
          />
        </label>
        <label>
          borderRadius
          <input
            type="number"
            value={borderRadius}
            onChange={(e) => setBorderRadius(e.target.valueAsNumber)}
          />
        </label>
        <label>
          centered
          <input
            type="checkbox"
            checked={centered}
            onChange={(e) => setCentered(e.target.checked)}
          />
        </label>
      </div>
    );
  };

  if (!componentToShow) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh',
        }}
      >
        <button
          type="button"
          style={{ width: 200, height: 50, fontSize: 20 }}
          onClick={() => setComponentToShow('mic')}
        >
          Use Microphone
        </button>
        <button
          type="button"
          style={{ width: 200, height: 50, fontSize: 20 }}
          onClick={() => setComponentToShow('element')}
        >
          Use Audio Element
        </button>
        <button
          type="button"
          style={{ width: 200, height: 50, fontSize: 20 }}
          onClick={() => setComponentToShow('src')}
        >
          Use File src
        </button>
      </div>
    );
  }

  if (componentToShow === 'src') {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setComponentToShow(null)}>Back</button>
        <h1>Audio Visualizer</h1>
        <AudioVisualizer
          height={300}
          width={window.innerWidth}
          audioSource="./Pokémon.mp3"
        />
      </div>
    );
  }

  if (componentToShow === 'element') {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setComponentToShow(null)}>Back</button>
        <h1>Audio Visualizer</h1>
        <audio controls src="./Pokémon.mp3" ref={setAudioElement}></audio>
        {audioElement && (
          <AudioVisualizer
            height={300}
            width={window.innerWidth}
            audioSource={audioElement}
          />
        )}
      </div>
    );
  }

  if (componentToShow === 'mic') {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setComponentToShow(null)}>Back</button>
        <h1>Microphone Visualizer</h1>
        {optionsMenu()}

        <MickInputVisualizer
          height={300}
          width={window.innerWidth}
          options={{
            barGap,
            redFactor,
            greenFactor,
            blueFactor,
            borderRadius,
            centered,
          }}
        />
      </div>
    );
  }
}
