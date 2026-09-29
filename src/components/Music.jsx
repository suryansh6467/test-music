"use client"

import { useEffect, useRef, useState } from "react"
import { Disc3, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react"

const tracks = [
    { title: "Background Music", artist: "Sweet Favor", src: "/audio/bg.mp3" },
]

function formatTime(value) {
    if (!Number.isFinite(value)) return "0:00"
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60).toString().padStart(2, "0")
    return `${minutes}:${seconds}`
}

export default function Music({ shouldPlay }) {
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [trackIndex, setTrackIndex] = useState(0)
    const track = tracks[trackIndex]

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        audio.volume = 0.8
        if (shouldPlay) {
            audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
        }
    }, [shouldPlay, trackIndex])

    const togglePlayback = () => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
            audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
        } else {
            audio.pause()
            setIsPlaying(false)
        }
    }

    const changeTrack = (direction) => {
        if (tracks.length === 1) {
            const audio = audioRef.current
            if (!audio) return
            audio.currentTime = 0
            audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
            return
        }
        setTrackIndex((index) => (index + direction + tracks.length) % tracks.length)
        setCurrentTime(0)
    }

    const seek = (event) => {
        const time = Number(event.target.value)
        if (audioRef.current) audioRef.current.currentTime = time
        setCurrentTime(time)
    }

    return (
        <section className="music-player" aria-label="Music player">
            <audio
                ref={audioRef}
                src={track.src}
                preload="metadata"
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => tracks.length > 1 ? changeTrack(1) : setIsPlaying(false)}
            />

            <div className="music-track-info">
                <div className={`music-cover${isPlaying ? " is-playing" : ""}`} aria-hidden="true">
                    <Disc3 size={23} strokeWidth={1.7} />
                </div>
                <div className="music-track-copy">
                    <span className="music-eyebrow">NOW PLAYING</span>
                    <span className="music-title" title={track.title}>{track.title}</span>
                    <span className="music-artist">{track.artist}</span>
                </div>
            </div>

            <div className="music-controls">
                <div className="music-buttons">
                    <button className="music-skip" type="button" onClick={() => changeTrack(-1)} aria-label="Previous song" title="Previous song">
                        <SkipBack size={17} fill="currentColor" />
                    </button>
                    <button className="music-play" type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pause" : "Play"} title={isPlaying ? "Pause" : "Play"}>
                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                    </button>
                    <button className="music-skip" type="button" onClick={() => changeTrack(1)} aria-label="Next song" title="Next song">
                        <SkipForward size={17} fill="currentColor" />
                    </button>
                </div>
                <div className="music-progress-row">
                    <span>{formatTime(currentTime)}</span>
                    <input
                        className="music-progress"
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.1"
                        value={Math.min(currentTime, duration || 0)}
                        onChange={seek}
                        aria-label="Song progress"
                        style={{ "--progress": `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="music-volume" aria-hidden="true"><Volume2 size={17} /></div>
        </section>
    )
}
