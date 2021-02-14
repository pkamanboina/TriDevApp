import React from "react"


class Playlist extends React.Component {
    constructor() {
        super()

    }
    render() {
        let playlist = this.props.playlist
        return(
            <div> 
                <div>
                <img src = {playlist.imageUrl} style = {{width: '160px'}}></img>
                </div>
                <p>{playlist.name}</p>
            </div>
        )
    }
}

export default Playlist
