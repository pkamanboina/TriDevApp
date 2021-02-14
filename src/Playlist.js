import React from "react"


class Playlist extends React.Component {
    constructor() {
        super()

    }
    render() {
        let playlist = this.props.playlist
        return(
            <div> 
                {playlist.name}
            </div>
        )
    }
}

export default Playlist