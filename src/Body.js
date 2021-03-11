import React from "react";
import "./Body.css"
import { Redirect, Link } from "react-router-dom";

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
        imgUrl: handleUserImage(data.images)
      },
      redirect: null
    }))

    function handleUserImage(jsonImg) {
      if (jsonImg.length == 0) {
        return []
      }
      else {
        return jsonImg[0].url
      }
    }
    

  }
  
  
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (

      
      <div>
        
        <div className="profile">
          <img src = {this.state.user.imgUrl} onerror="this.onerror=null; this.src='Default.jpg'" alt="" style = {{width: '60px'}}></img>
          <h1 style={{display: !this.state.user.name && "none"}} className="username">
            Username: {this.state.user.name}
          </h1>
          
        </div>
        
        

        <button style={{display: this.state.isLoggedIn && "none"}} className="login" onClick={handleLogin}> Login </button>
        <Link to="/artists">
          <button style={{display: !this.state.isLoggedIn && "none"}}className="artistsButton" > Top Artists </button>
        </Link>
        <Link to="/playlists">
          <button style={{display: !this.state.isLoggedIn && "none"}}className="playlistsButton" > Playlists </button>
        </Link>
        <Link to="/toptracks">
          <button style={{display: !this.state.isLoggedIn && "none"}}className="topTracksButton" > Top Tracks </button>
        </Link>
        <Link to="/recently-played">
          <button style={{display: !this.state.isLoggedIn && "none"}}className="recentlyPlayedButton" > Recently Played </button>
        </Link>
        <Link to="/recommendations">
          <button style={{display: !this.state.isLoggedIn && "none"}}className="recommendedButton" > Recommended Artists</button>
        </Link>
        <Link to="/recommended-tracks">
          <button style={{display: !this.state.isLoggedIn && "none"}}className="recommendedButton" > Recommended Tracks </button>
        </Link>
        <br />

        <ul className="description" >
            <li>Login to your Spotify account</li>
            <li>View your top artists and songs</li>
            <li>Access your playlists</li>
            <li>See your recently played artists and songs</li>
            <li>Finds new songs based on recommendations</li>
        </ul>

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





export default Body
