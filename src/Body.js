import React from "react";
import "./Body.css"
import { Redirect } from "react-router-dom";

let accessToken
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
  
    if(!this.props.token) 
      return;
    else 
      this.setState({isLoggedIn: true})

    accessToken = this.props.token
    
    fetch("https://api.spotify.com/v1/me", {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name,
        imgUrl: data.images[0].url
      },
      redirect: null
    }))

    
    


  }
  
  
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (

      
      <div>
        
        <div className="profile">
          <img src = {this.state.user.imgUrl} style = {{width: '60px'}}></img>
          <h1 style={{display: !this.state.user.name && "none"}} className="username">
            Username: {this.state.user.name}
          </h1>
        </div>
        <button style={{display: this.state.isLoggedIn && "none"}} className="login" onClick={handleLogin}> Login </button>
        <button className="artistsButton" onClick={handleTopArtists}> Top Artists </button>
        <button className="playlistsButton" onClick={handlePlaylists}> Playlists </button>
        <button className="topTracksButton" onClick={handleTopTracks}> Top Tracks </button>
        <br />

        {this.state.user.name ?
        <h1 className="username">
          Username: {this.state.user.name}
        </h1>
        : [] 
        }
        <div style={{display: 'flex'}}>
        <br />
        <hr />
        

          </div>
        </div>
        

    );
  }
}


function handleLogin() {
  window.open("http://localhost:8888/login");
}

function handleTopTracks() {
  window.open("http://localhost:3000/toptracks/?access_token=" + accessToken)
}


function handleTopArtists() {
  window.open("http://localhost:3000/artists/?access_token=" + accessToken)
}
function handlePlaylists() {
  window.open("http://localhost:3000/playlists/?access_token=" + accessToken)
}




export default Body
