import { useEffect, useRef, useState } from "react";
import './zustandStore';
import { useStore } from './zustandStore';

const VideoEditor: React.FC = () => {
  const { clipList } = useStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false); 

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const renderFrame = () => {
        if (!video.paused && !video.ended && ctx) {
          if (isPreviewMode) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height); 
            applyTransformations(ctx); 
            requestAnimationFrame(renderFrame);
          }
        }
      };
      renderFrame();

      video.addEventListener("timeupdate", renderFrame); //for timeline scrubbing and all that so that it updates on time
      return () => {
        video.removeEventListener("timeupdate", renderFrame);
      };
    }
  }, [isPreviewMode]);

  const applyTransformations = (ctx: CanvasRenderingContext2D) => { // for adding text (this is just an example)
    ctx.font = "100px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("AAAAA", 50, 50); 
  };

  const togglePreviewMode = () => {
    setIsPreviewMode((prev) => !prev);
  };

  return (
    <div>
      <video
        ref={videoRef}
        width="70%"
        height="70%"
        controls
      >
        {clipList[0] && !isPreviewMode && <source src={clipList[0].url} type={clipList[0].type} />}
        Your browser does not support the video element.
      </video>
      <br></br>
      <button onClick={togglePreviewMode}>
        {isPreviewMode ? "Switch to Video Mode" : "Switch to Preview Mode"}
      </button>
      {isPreviewMode && <canvas ref={canvasRef} width="70%" height="70%"></canvas>}
    </div>
  );
};

export default VideoEditor;
