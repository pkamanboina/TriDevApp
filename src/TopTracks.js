import React from "react"
import "./TopTracks.css"

class TopTracks extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
    if(!this.props.token) 
        return;

    fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: {'Authorization': 'Bearer ' + this.props.token}
    }).then(response => response.json()) 
    .then(data => this.setState({
      topTracks: data.items.map(track => {
        return {
          name: track.name,
          artist: track.artists.map(artist => {
            return (
              artist.name + " "
            )
          })
        }
      })
    }))

    }
    render() {
        return (
        <div>
          {this.state.topTracks ?
          <div className = "topTracks">

            <h3 className="heading">Top Tracks:</h3>
            <br />
            {this.state.topTracks.map(track => 
              <div>
              <p className="tracks">{track.name} - {track.artist}</p>
            </div>
            )}
          </div>
          : []
          }
        </div>
            
        )
                       
    }
}

export default TopTracks