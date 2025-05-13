import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title: string;
  thumbnailUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title, thumbnailUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    const video = videoRef.current;
    if (!progressBar || !video) return;

    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value;
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    
    const progress = (video.currentTime / video.duration) * 100;
    setProgress(progress);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime += seconds;
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-charcoal-900">
      <div className="aspect-video relative">
        {!isLoaded && (
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleVideoLoad}
          poster={thumbnailUrl}
          preload="metadata"
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30"
            onClick={togglePlay}
          >
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
              <Play size={32} className="text-white ml-1" />
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-charcoal-800 p-4">
        <h3 className="text-white font-medium mb-3">{title}</h3>
        
        <div className="relative">
          <div 
            ref={progressBarRef}
            onClick={handleProgress}
            className="h-2 bg-charcoal-700 rounded-full overflow-hidden cursor-pointer"
          >
            <div 
              className="h-full bg-blue-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => skip(-10)}
              className="text-charcoal-300 hover:text-white transition-colors"
              aria-label="Skip backward 10 seconds"
            >
              <SkipBack size={20} />
            </button>
            
            <button
              onClick={togglePlay}
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            
            <button 
              onClick={() => skip(10)}
              className="text-charcoal-300 hover:text-white transition-colors"
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <Volume2 size={18} className="text-charcoal-300" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-charcoal-600 rounded-full appearance-none cursor-pointer"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;