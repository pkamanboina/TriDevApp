import React from "react"
import queryString from "query-string";
import Playlist from "./Playlist"
import TopArtists from "./TopArtists"
import "./Body.css"


class Body extends React.Component{

  constructor() {
    super()
    this.state = {
      user: {
        name: ""
      }
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token
    if (!accessToken)
      return;
    fetch("https://api.spotify.com/v1/me", {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({user: {name: data.display_name}}))

    
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      playlists: data.items.map(item => {
        console.log(data.items)
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
        console.log(data)
        return {
          name: artist.name,
          imageUrl: artist.images[2].url
        }
      })
    })) 

  }

  
  render() {

    console.log(this.state.playlists)
    return (
      <div>
        <button onClick={handleClick}> Login </button>
        <br />
        <hr />
        {this.state.user.name ?
        <h1>
          Username: {this.state.user.name}
        </h1>
        : [] 
        }
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
            {this.state.topArtists.map(artist => 
              <TopArtists topArtists = {artist} />
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

/*
        <div> 
        
        {this.state.playlists.map(playlist => 
            <Playlist playlist={playlist} />
        )}
        
        </div>
        */
        

function handleClick() {
  window.open("http://localhost:8888/login");
}





export default Body
