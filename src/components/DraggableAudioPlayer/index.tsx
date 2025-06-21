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

  const updateAudio = useCallback((percentage: number) => {
    if (!audioRef.current) return;
    const { duration } = audioRef.current;
    if (!isFinite(duration)) return;
    audioRef.current.currentTime = (percentage * duration) / 100;
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current || !pathRef.current || !dotRef.current || !isFinite(audioRef.current.duration)) return;

    const { currentTime, duration } = audioRef.current;
    const percentage = (currentTime / duration) * 100;
    const offset = totalLength - (percentage / 100) * totalLength;
    pathRef.current.style.strokeDashoffset = offset.toString();

    const point = pathRef.current.getPointAtLength((percentage / 100) * totalLength);
    dotRef.current.setAttribute('cx', point.x.toString());
    dotRef.current.setAttribute('cy', point.y.toString());
  }, [totalLength]);

  const handleDrag = useCallback((e: MouseEvent | React.MouseEvent<SVGPathElement | SVGCircleElement>) => {
      if (!circleRef.current || !pathRef.current || !dotRef.current) return;
      const bounds = circleRef.current.getBoundingClientRect();
      const radius = bounds.width / 2;
      const dx = e.clientX - (bounds.left + radius);
      const dy = e.clientY - (bounds.top + radius);
      let angle = Math.atan2(dy, dx);
      if (angle < 0) angle += 2 * Math.PI;

      angle = (angle + Math.PI / 2) % (2 * Math.PI);
      const percentage = (angle / (2 * Math.PI)) * 100;

      updateAudio(percentage);
      handleTimeUpdate(); // Update visuals immediately
    },
    [totalLength, updateAudio, handleTimeUpdate],
  );

  useEffect(() => {
    if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        setTotalLength(length);
        pathRef.current.style.strokeDasharray = length.toString();
        pathRef.current.style.strokeDashoffset = length.toString();
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<SVGCircleElement | SVGPathElement>) => {
    setIsDragging(true);
    handleDrag(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleDrag(e);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleDrag]);

  const playPauseHandler = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      document.querySelectorAll('audio').forEach(a => {
        if (a !== audio) a.pause();
      });
      audio.play().catch(console.error);
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleAudioEnd = () => {
      setIsPlaying(false);
      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = totalLength.toString();
      }
    };

    const handleCanPlay = () => {
      handleTimeUpdate();
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleAudioEnd);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleAudioEnd);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, [totalLength, handleTimeUpdate]);

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
          viewBox="0 0 100 100"
          ref={circleRef}
        >
          <path
            id="background"
            fill="none"
            stroke="#6d6d6d"
            strokeLinecap="round"
            d="M50,2.9L50,2.9C76,2.9,97.1,24,97.1,50v0C97.1,76,76,97.1,50,97.1h0C24,97.1,2.9,76,2.9,50v0C2.9,24,24,2.9,50,2.9z"
            onClick={handleDrag}
          />
          <path
            id="seekbar"
            ref={pathRef}
            fill="none"
            strokeLinecap="round"
            d="M50,2.9L50,2.9C76,2.9,97.1,24,97.1,50v0C97.1,76,76,97.1,50,97.1h0C24,97.1,2.9,76,2.9,50v0C2.9,24,24,2.9,50,2.9z"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          />
          <circle
            className="progress-handle"
            ref={dotRef}
            r="4"
            cx="50"
            cy="2.9"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
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