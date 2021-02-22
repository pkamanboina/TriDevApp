
import './App.css';
import Body from "./Body"
import React from "react"
import TopArtists from "./TopArtists"
import queryString from "query-string";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from '@testing-library/react';
import Playlist from './Playlist';
import TopTracks from "./TopTracks"

class App extends React.Component{
    constructor() {
      super()
      this.state = {
        token: ""
      }
    }

    componentDidMount() {
      let parsed = queryString.parse(window.location.search);
      let accessToken = parsed.access_token
      if (!accessToken)
        return;
      this.setState({token: accessToken})
    }
    render () {
      
      return(
      <div className="App">
        <div className="headerContainer">
          <h1 className="header">Spotify Stats App</h1>
        </div>

       
        <main>


        <Router>
        <Switch>
          <Route path="/" exact component={() => <Body token={this.state.token} />} />
          <Route path="/playlists" exact component={() => <Playlist token={this.state.token} />} />
          <Route path="/artists" exact component={() => <TopArtists token={this.state.token} />} />
          <Route path="/toptracks" exact component={() => <TopTracks token={this.state.token} />} />
        </Switch>
        </Router>

        
        

          <Body />
          <ul className="description" >
            <li>Login to your Spotify account</li>
            <li>View your top artists and songs</li>
            <li>Access your playlists</li>
            <li>See your recently played artists and songs</li>
            <li>Finds new songs based on recommendations</li>
          </ul>
        </main>
          
      </div>
      )
    }
  
}



export default App;
