import React from "react"
import "./RecentlyPlayed.css"

class RecentlyPlayed extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
    if(!this.props.token) 
        return;

    fetch('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {'Authorization': 'Bearer ' + this.props.token}
    }).then(response => response.json()) 
    .then(data => this.setState({
        recently_played: data.items.map(item => {
          return {
            name: item.track.name,
            preview: item.track.preview_url,
            artist: item.track.artists ? item.track.artists.map(art => {
              return (
                art.name + " "
              )
            }) : []
          }
        })
      }))

    }
    render() {
        let rank = 1
        return (
        <div>
          {this.state.recently_played ?
          <div className = "recentlyPlayed">

            <h3 className="heading">RecentlyPlayed:</h3>
            
            <br />
            {this.state.recently_played.map(track => 
              <div>
              <p className="tracks">{rank++}. {track.name} - {track.artist}</p>
              <audio controls>
                <source src={track.preview} />
              </audio>
            </div>
            )}
          </div>
          : []
          }
        </div>
            
        )
                       
    }
}

export default RecentlyPlayed