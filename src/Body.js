import React from "react";
import queryString from "query-string";
import './Body.css'

let params


class Body extends React.Component{

  constructor() {
    super()
    this.state = {
      serverData: {
        user: {
          name: '',
        }
      }
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token
    fetch("https://api.spotify.com/v1/me", {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({serverData: {user: {name: data.display_name}}}))
  }

  
  render() {
    
    
    return (
      <div>
        <button className="login" onClick={handleClick}> Login </button>
        <br />
        <hr />
        {this.state.serverData.user.name ?
        <h1 className="username">
          Username: {this.state.serverData.user.name}
        </h1>
        : [] 
        }

      </div>

    );
  }
}

function handleClick() {
  window.open("http://localhost:8888/login");
}





export default Body
