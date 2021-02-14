import React from "react"

class TopTracks extends React.Component {
    constructor() {
        super()
    }

    render() {
        let topTracks = this.props.topTracks
        return (
            <div>
                <p>{topTracks.name} - {topTracks.artist}</p>
            </div>
        )
                       
    }
}

export default TopTracks