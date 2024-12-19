import { useEffect, useRef, useState } from "react";
import './zustandStore';
import { useStore } from './zustandStore';

const VideoEditor: React.FC = () => {
  const { clipList } = useStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false); 
  const [videoWidth, setVideoWidth] = useState<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const onMetadataLoaded = () => {
        setVideoWidth(video.videoWidth); // for the div size to be consistent with video and canvas
      };

      video.addEventListener('loadedmetadata', onMetadataLoaded);

      return () => {
        video.removeEventListener('loadedmetadata', onMetadataLoaded);
      };
    }
  }, [clipList]);
  
  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      

      const renderFrame = () => {
        if (!video.paused && !video.ended && ctx) {
          if (isPreviewMode) {
            canvas.width = video.videoWidth * 0.7;
            canvas.height = video.videoHeight * 0.7;
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
    <div style={{
      width:  `${videoWidth}px`, 
      display: "flex",
      flexDirection: "column", 
      justifyContent: "center",
      alignItems: "center", 
    }}>
    {clipList[0] && ( //only show if a clip has been imported already
      <video 
        ref={videoRef} 
        width="70%"
        height="70%" 
        controls
        style={{ display: isPreviewMode ? 'none' : 'block' }}
      >
        <source src={clipList[0].url} type={clipList[0].type} />
        Your browser does not support the video element.
      </video>
    )}

      {isPreviewMode && <canvas ref={canvasRef}   
      width="70%"
      height="70%"   
      style={{display: isPreviewMode ? "block" : "none"}}/>}

      <button onClick={togglePreviewMode}>
        {isPreviewMode ? "Switch to Video  Mode" : "Switch to Preview Mode"}
      </button>
      
    </div>
  );
};

export default VideoEditor;
