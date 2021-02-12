import React from "react"
import Spotify from "spotify-web-api-js";

const spotify = new Spotify();
let params
let token
class Body extends React.Component{

  constructor() {
    super()
    params = this.getHashParams();
    token = params.access_token;
    console.log(token)
    this.state = {
        isLoggedIn: params.access_token ? true : false,
        topTracks: []
    }

    if(params.access_token) {
        spotify.setAccessToken(params.access_token)
    }
}

   /* returns info such as access token after user logs in. If login fails,
    access token does not exist.
   */
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }


    getTopTracks() {
        spotify.getMyTopTracks(token).then((ans) => {
            this.setState({
                topTracks: ans.item
            })
            });
    }
  

  
  render() {
    
    // FIXME: removes button if user is logged in -- still needs work
    const styles = {
        display: this.state.isLoggedIn ? "none" : "blocked"
    }
    return (
      <div>
        <button onClick={handleClick} style={styles}> Login </button>
        <hr />
        <br/>
        <button onClick={() => this.getTopTracks()}>Top Tracks</button>
                <p>
                    {this.state.topTracks}
                </p>
      </div>
    );
  }
}

function handleClick() {
  window.open("http://localhost:8888");
}





export default Body
