import React from "react"
import "./Playlist.css"


class Playlist extends React.Component {
    constructor() {
        super()
        this.state = {

        }

    }

    componentDidMount() {
        if(!this.props.token) return;

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + this.props.token}
    }).then(response => response.json())
    .then(data => this.setState({
      playlists: data.items.map(item => {
        return {
          name: item.name,
          imageUrl: item.images[0].url, 
          songs: []
        }
    })
    }))
    }
    render() {
        return(
        <div>
            {this.state.playlists ?
            <div className="playlists">

            <h3 className="heading">Playlists:</h3>
            <br />
            {this.state.playlists.map(playlist => 
            <div> 
              <div>
              <img src = {playlist.imageUrl} style = {{width: '160px'}}></img>
              </div>
              <p className="playlistName">{playlist.name}</p>
          </div>
          )}
          </div>
          : []
          }
        </div>
        )
    }
}

export default Playlist
