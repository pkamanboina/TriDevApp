import React from "react"


class Playlist extends React.Component {
    constructor() {
        super()

    }
    render() {
        let playlist = this.props.playlist
        return(
            <div> 
                <img src = {playlist.imageUrl} style = {{width: '160px'}}></img>
                {playlist.name}
            </div>
        )
    }
}

export default Playlist