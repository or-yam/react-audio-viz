import { AudioVisualizer } from '../lib/AudioVisualizer';

export default function App() {
  return (
    <div>
      <AudioVisualizer height={window.innerHeight} width={window.innerWidth} />
    </div>
  );
}
