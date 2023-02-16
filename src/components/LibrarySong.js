const LibrarySong = ({song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs}) => {
    const songSelectHandler = async () => {
        await setCurrentSong(song);
        const newSongs = songs.map((song) => {
            if(song.id === id){
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
        setSongs(newSongs);
        if(isPlaying) audioRef.current.play()
        // if(isPlaying){
        //     const playPromise = audioRef.current.play();
        //     if(playPromise !== undefined){
        //         playPromise.then((audio) => {
        //             audioRef.current.play();
        //         })
        //     }
        // }
    }
    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img alt={song.name} src={song.cover} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;