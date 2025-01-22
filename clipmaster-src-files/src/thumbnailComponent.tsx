import { useEffect, useState } from 'react';
import './zustandStore';
import { useStore } from './zustandStore';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

interface DropResult {
  name: string;
}

interface ThumbnailItemProps {
  thumbnail: string;
  index: number;
  clip: { name: string; url: string }; 
}

function ThumbnailItem({ thumbnail, index, clip }: ThumbnailItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.THUMBNAIL,
    item: { name: clip.name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        alert(`Work in progress! I've yet to implement the timeline as of 01-21-25`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={drag} 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        opacity,
      }}
    >
      <img
        src={thumbnail}
        alt={`Thumbnail ${index}`}
        style={{
          width: '300px',
          height: 'auto',
          objectFit: 'cover',
        }}
      />
      {clip.name}
    </div>
  );
}

export default function ThumbnailComponent() {
  const { clipList } = useStore();
  const [thumbnailList, setThumbnailList] = useState<string[]>([]);

  useEffect(() => {
    const newThumbnails: string[] = [];

    clipList.forEach((clip) => {
      //console.log(clip)
      const videoElement = document.createElement('video');
      videoElement.src = clip.url;
      videoElement.crossOrigin = 'anonymous'; 
      videoElement.currentTime = 1;

      videoElement.onloadeddata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          newThumbnails.push(canvas.toDataURL('image/png')); 
          if (newThumbnails.length === clipList.length) {
            setThumbnailList(newThumbnails);
          }
        }
      };
    });
  }, [clipList]);

  return (
    (thumbnailList as string[]).length > 0 && (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {thumbnailList.map((thumbnail, index) => (
          <ThumbnailItem
            key={index}
            thumbnail={thumbnail}
            index={index}
            clip={clipList[index]}
          />
        ))}
      </div>
    )
  );
}
