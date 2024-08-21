import './app.css';
import { useState } from 'react';
import { AudioVisualizer, MickInputVisualizer } from '../lib/index';

export default function App() {
  const [componentToShow, setComponentToShow] = useState<
    null | 'mic' | 'element'
  >(null);

  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null,
  );

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
            audioElement={audioElement}
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
        <MickInputVisualizer height={300} width={window.innerWidth} />
      </div>
    );
  }
}
