import { useEffect, useRef, type CSSProperties, type JSX } from 'react';
import { fullSizeBlock } from '../../../styles/pages-styles';
import Theme from '../../../styles/theme';

interface AudioVisualizerProps {
  stream: MediaStream;
}

/**
 * This component renders a visual representation of the audio stream.
 *
 * @param {AudioVisualizerProps} props - The props for the AudioVisualizer component.
 * @param {MediaStream} props.stream - The audio stream to visualize.
 * @returns {JSX.Element} The rendered AudioVisualizer component.
 */

export const AudioVisualizer = ({ stream }: AudioVisualizerProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');

      const audioCtx = new window.AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();

      source.connect(analyser);
      analyser.fftSize = 256;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const visualize = () => {
        requestAnimationFrame(visualize);

        analyser.getByteFrequencyData(dataArray);

        (ctx as CanvasRenderingContext2D).clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / dataArray.length) * 8;

        let x = 0;

        const gradient = (ctx as CanvasRenderingContext2D).createLinearGradient(
          0,
          Math.floor(canvas.height / 1.5),
          Math.floor(canvas.width / 1.5),
          0,
        );

        gradient.addColorStop(0, `${Theme.palette.primary.main}`);
        gradient.addColorStop(1, `${Theme.palette.secondary.main}`);

        for (let i = 0; i < dataArray.length; i++) {
          const barHeight = dataArray[i];

          (ctx as CanvasRenderingContext2D).fillStyle = gradient;
          (ctx as CanvasRenderingContext2D).fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);

          x += barWidth + 1;
        }
      };
      visualize();
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      key={'audio-visualizer-canvas-element'}
      id={'audio-visualizer-canvas-element'}
      style={fullSizeBlock as CSSProperties}
    />
  );
};

export default AudioVisualizer;
