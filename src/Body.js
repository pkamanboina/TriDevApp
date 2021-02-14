import React from "react";
import queryString from "query-string";
import Playlist from "./Playlist"
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
    
    

  }

  
  render() {

    console.log(this.state.playlists)
    return (
      <div>
        <button className="login" onClick={handleClick}> Login </button>
        <br />
        <hr />
        {this.state.user.name ?
        <h1 className="username">
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
            <h3>Favorite Artists</h3>
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
