import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ({audioRef, currentSong, isPlaying, setIsPlaying, setSongInfo, songInfo, songs, setCurrentSong, setSongs}) => {
    
    const activeLibraryHandler = (nextPrev) =>{
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id){
                return{
                    ...song,
                    active: true,
                }
            }else{
                return{
                    ...song,
                    active: false,
                }
            }
        })
        setSongs(newSongs)
    }

    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }
    
    const getTime = (time) => {
        return(
            Math.floor(time / 60 ) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    }

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === "skip-forward"){
            await setCurrentSong(songs[(currentIndex+1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex+1) % songs.length]);
        }else{
            if((currentIndex - 1) % songs.length === -1){
                await setCurrentSong(songs[songs.length-1]);
                activeLibraryHandler(songs[songs.length-1]);
                
            }else{
                await setCurrentSong(songs[(currentIndex-1) % songs.length]);
                activeLibraryHandler(songs[(currentIndex-1) % songs.length]);
            }
        }
        if(isPlaying) audioRef.current.play()
    }

    const trackAnim = {
        transform : `translateX(${songInfo.animationPercentage}%)`
    }
    
    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track" style={{background : `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]} )`}}>
                    <input onChange={dragHandler} type="range" min={0} max={songInfo.duration || 0} value={songInfo.currentTime} name="" id="" />
                    <div className="animate-track" style={trackAnim}></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back util" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className="play util" size="2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward util" size="2x" icon={faAngleRight}/>
            </div>
        </div>
    )
}

export default Player;