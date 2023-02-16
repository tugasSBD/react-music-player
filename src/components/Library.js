import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({songs, setCurrentSong, id, audioRef, isPlaying, setSongs, libraryStatus}) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => <LibrarySong setSongs={setSongs} songs={songs} isPlaying={isPlaying} setCurrentSong={setCurrentSong} song={song} id={song.id} key={song.id} audioRef={audioRef}/>)}
            </div>
        </div>
    )
}

export default Library;