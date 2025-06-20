"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import './index.css';

interface AudioPlayerProps {
    src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const circleRef = useRef<SVGSVGElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [totalLength, setTotalLength] = useState(0);

  const handleDrag = useCallback(
    (e: MouseEvent) => {
      if (!circleRef.current || !pathRef.current || !dotRef.current) return;
      const bounds = circleRef.current.getBoundingClientRect();
      const radius = bounds.width / 2;
      const dx = e.clientX - (bounds.left + radius);
      const dy = e.clientY - (bounds.top + radius);
      let angle = Math.atan2(dy, dx);
      if (angle < 0) {
        angle += 2 * Math.PI; // Add 2π if angle is less than 0
      }
      // Adjust for the SVG circle's 0 degrees being at the 3 o'clock position
      angle = (angle + Math.PI / 2) % (2 * Math.PI);
      const percentage = (angle / (2 * Math.PI)) * 100;
      updateAudio(percentage);

      const point = pathRef.current.getPointAtLength((percentage / 100) * totalLength);
      dotRef.current.setAttribute('cx', point.x.toString());
      dotRef.current.setAttribute('cy', point.y.toString());
    },
    [totalLength],
  );

  useEffect(() => {
    if (pathRef.current) {
        const path = pathRef.current;
        const length = path.getTotalLength();
        setTotalLength(length);
        path.style.strokeDasharray = length.toString();
        path.style.strokeDashoffset = length.toString();
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<SVGCircleElement, MouseEvent> | React.TouchEvent<SVGCircleElement>) => {
    setIsDragging(true);
    handleDrag(e as any);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleDrag(e);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleDrag]);

  const handleTimeUpdate = () => {
    if (!audioRef.current || !pathRef.current || !dotRef.current) return;

    const { currentTime, duration } = audioRef.current;
    const maxDuration = duration;
    const calc = totalLength - (currentTime / maxDuration) * totalLength;
    pathRef.current.style.strokeDashoffset = calc.toString();

    const percentage = (currentTime / maxDuration) * 100;
    const point = pathRef.current.getPointAtLength((percentage / 100) * totalLength);
    dotRef.current.setAttribute('cx', point.x.toString());
    dotRef.current.setAttribute('cy', point.y.toString());
  };

  const updateAudio = (percentage: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const maxDuration = audio.duration;
    const currentTime = (percentage * maxDuration) / 100;
    audio.currentTime = currentTime;
  };

  const playPauseHandler = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      document.querySelectorAll('audio').forEach(a => a.pause());
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

    useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !circleRef.current) return;
    const path = circleRef.current.querySelector<SVGPathElement>('#seekbar');
    if (!path) return;

    path.style.strokeDasharray = totalLength.toString();
    path.style.strokeDashoffset = totalLength.toString();

    const handleAudioEnd = () => {
      setIsPlaying(false);
      if(path) {
        path.style.strokeDashoffset = totalLength.toString();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleAudioEnd);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleAudioEnd);
    };
  }, [isPlaying, totalLength, handleTimeUpdate]);


  return (
    <section className={`slide__audio ${isPlaying ? 'playing' : 'paused'}`}>
      <audio ref={audioRef} className="slide__audio-player" controls>
        <track kind="captions" />
        <source src={src} type="audio/mpeg" />
      </audio>
      <figure className="audio__controls">
        <svg
          version="1.1"
          id="circle"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 100 100"
          ref={circleRef}
        >
          <path
            id="background"
            fill="none"
            stroke="#6d6d6d"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M50,2.9L50,2.9C76,2.9,97.1,24,97.1,50v0C97.1,76,76,97.1,50,97.1h0C24,97.1,2.9,76,2.9,50v0C2.9,24,24,2.9,50,2.9z"
            onClick={(e) => handleDrag(e as any)}
          />
          <path
            id="seekbar"
            ref={pathRef}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M50,2.9L50,2.9C76,2.9,97.1,24,97.1,50v0C97.1,76,76,97.1,50,97.1h0C24,97.1,2.9,76,2.9,50v0C2.9,24,24,2.9,50,2.9z"
            onMouseDown={(e) => handleDrag(e as any)}
            onMouseUp={handleMouseUp}
          />
          <circle
            className="progress-handle"
            ref={dotRef}
            r="4"
            cx="50"
            cy="2"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="equalizer" viewBox="0 0 100 100" >
          <g className="equalizer-group">
            <rect className="bar" />
            <rect className="bar" />
            <rect className="bar" />
            <rect className="bar" />
            <rect className="bar" />
          </g>
        </svg>

        <button className="play-pause" onClick={playPauseHandler} aria-label="Play Pause Button">
          <span className="hidden">{isPlaying ? 'Pause' : 'Play'}</span>
        </button>
      </figure>
    </section>
  );
};

export default AudioPlayer;