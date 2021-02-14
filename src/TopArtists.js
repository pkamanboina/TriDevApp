import React from "react"

class TopArtists extends React.Component {
    constructor() {
        super()
    }

    render() {
        let topArtists = this.props.topArtists
        return (
            <div>
                <img src = {topArtists.imageUrl}></img>
                {topArtists.name}
            </div>
        )
    }
}

export default TopArtists