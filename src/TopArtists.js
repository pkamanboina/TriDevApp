import React from "react"

class TopArtists extends React.Component {
    constructor() {
        super()
    }

    render() {
        let topArtists = this.props.topArtists
        return (
            <div>
                <div>
                <img src = {topArtists.imageUrl}></img>
                </div>
                <p>{topArtists.name}</p>
            </div>
        )
    }
}

export default TopArtists