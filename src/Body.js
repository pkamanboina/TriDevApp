import React from "react";
import queryString from "query-string";
import Playlist from "./Playlist"
import TopArtists from "./TopArtists"
import TopTracks from "./TopTracks"
import "./Body.css"


class Body extends React.Component{

  constructor() {
    super()
    this.state = {
      user: {
        name: ""
      },
      isLoggedIn: false
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token
    if (!accessToken)
      return;
    else 
      this.setState({isLoggedIn: true})
    
    fetch("https://api.spotify.com/v1/me", {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({user: {name: data.display_name}}))

    
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
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


    fetch('https://api.spotify.com/v1/me/top/artists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
  }).then(response => response.json()) 
    .then(data => this.setState({
      topArtists: data.items.map(artist => {
        return {
          name: artist.name,
          imageUrl: artist.images[2].url
        }
      })
    })) 

    fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: {'Authorization': 'Bearer ' + accessToken}
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
        <button style={{display: this.state.isLoggedIn && "none"}} className="login" onClick={handleClick}> Login </button>
        <br />
        <hr />
        <h1 style={{display: !this.state.user.name && "none"}} className="username">
          Username: {this.state.user.name}
        </h1>

        <div style={{display: 'flex'}}>
          {this.state.playlists ?
          <div className="playlists">

          <h3>Playlists:</h3>
          <br />
          {this.state.playlists.map(playlist => 
              <Playlist playlist={playlist} />
          )}
          </div>
          : []
          }
          <div>

        <div>
          {this.state.topArtists ? 
          <div className = "topArtists">
            
            <h3>Top Artists:</h3>
            <br />
            {this.state.topArtists.map(artist => 
              <TopArtists topArtists = {artist} />
              )}
          </div>
          : []
          }
        </div>
        <br />
        <hr />
        <div>
          {this.state.topTracks ?
          <div className = "topTracks">

            <h3>Top Tracks:</h3>
            <br />
            {this.state.topTracks.map(track => 
              <TopTracks topTracks = {track} />
              )}
          </div>
          : []
          }
        </div>

          </div>
        </div>
        

      </div>

    );
  }
}



function handleClick() {
  window.open("http://localhost:8888/login");
}





export default Body
