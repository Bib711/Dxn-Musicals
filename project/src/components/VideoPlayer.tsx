import React, { useState, useEffect, useRef } from 'react';
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
  const [videoId, setVideoId] = useState<string | null>(null);
  
  // Generate unique ID for each player instance
  const playerInstanceId = useRef(`youtube-player-${Math.random().toString(36).substr(2, 9)}`);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<number | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Check if it's a YouTube embed URL
    const isYoutubeEmbed = url.includes('youtube.com/embed/');
    
    if (isYoutubeEmbed) {
      // Extract video ID from embed URL
      const idMatch = url.match(/\/embed\/([^/?]+)/);
      const extractedId = idMatch ? idMatch[1] : null;
      setVideoId(extractedId);
      
      // Create a script tag to load the YouTube iframe API if not already loaded
      if (!(window as any).YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
      
      // Clean up on unmount
      return () => {
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
        // Destroy the player instead of removing the iframe
        if (playerRef.current) {
          try {
            playerRef.current.destroy();
          } catch (e) {
            console.error("Error destroying player:", e);
          }
        }
      };
    }
  }, [url]);
  
  useEffect(() => {
    // Initialize YouTube player once the API is ready and we have a video ID
    if (videoId) {
      const initYouTubePlayer = () => {
        if (!(window as any).YT || !(window as any).YT.Player) {
          // If API not ready yet, wait and try again
          setTimeout(initYouTubePlayer, 100);
          return;
        }
        
        // Create the iframe directly
        if (containerRef.current) {
          // Remove any existing iframe first
          while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
          }
          
          // Create a new iframe element
          const iframe = document.createElement('iframe');
          iframe.id = playerInstanceId.current;
          iframe.width = '100%';
          iframe.height = '100%';
          iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&showinfo=0&rel=0`;
          iframe.frameBorder = '0';
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
          iframe.allowFullscreen = true;
          containerRef.current.appendChild(iframe);
          
          // Initialize the player
          const player = new (window as any).YT.Player(playerInstanceId.current, {
            events: {
              'onReady': (event: any) => {
                event.target.setVolume(volume * 100);
                setIsLoaded(true);
                // Store the player reference
                playerRef.current = event.target;
              },
              'onStateChange': (event: any) => {
                // Update playing state based on YouTube player state
                if (event.data === (window as any).YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                  
                  // Start tracking progress
                  if (progressInterval.current) {
                    clearInterval(progressInterval.current);
                  }
                  progressInterval.current = window.setInterval(() => {
                    if (playerRef.current) {
                      try {
                        const currentTime = playerRef.current.getCurrentTime();
                        const duration = playerRef.current.getDuration();
                        if (currentTime && duration) {
                          setProgress((currentTime / duration) * 100);
                        }
                      } catch (e) {
                        console.error("Error updating progress:", e);
                      }
                    }
                  }, 1000) as unknown as number;
                  
                } else if (event.data === (window as any).YT.PlayerState.PAUSED) {
                  setIsPlaying(false);
                  if (progressInterval.current) {
                    clearInterval(progressInterval.current);
                  }
                } else if (event.data === (window as any).YT.PlayerState.ENDED) {
                  setIsPlaying(false);
                  setProgress(100);
                  if (progressInterval.current) {
                    clearInterval(progressInterval.current);
                  }
                }
              }
            }
          });
        }
      };
      
      // Initialize player
      initYouTubePlayer();
    }
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [videoId, volume]);

  const togglePlay = () => {
    if (playerRef.current) {
      try {
        if (isPlaying) {
          playerRef.current.pauseVideo();
        } else {
          playerRef.current.playVideo();
        }
      } catch (e) {
        console.error("Error toggling play state:", e);
      }
    }
  };

  const handleProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    if (!progressBar) return;
    
    if (playerRef.current) {
      try {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const duration = playerRef.current.getDuration();
        playerRef.current.seekTo(percent * duration);
      } catch (e) {
        console.error("Error handling progress:", e);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    
    if (playerRef.current) {
      try {
        playerRef.current.setVolume(value * 100);
      } catch (e) {
        console.error("Error changing volume:", e);
      }
    }
  };

  const skip = (seconds: number) => {
    if (playerRef.current) {
      try {
        const currentTime = playerRef.current.getCurrentTime();
        playerRef.current.seekTo(currentTime + seconds);
      } catch (e) {
        console.error("Error skipping:", e);
      }
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
        
        <div 
          ref={containerRef} 
          className={`w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        ></div>
        
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