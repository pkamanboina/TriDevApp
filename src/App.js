
import './App.css';
import Body from "./Body"
import React from "react"
import TopArtists from "./TopArtists"
import queryString from "query-string";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from '@testing-library/react';
import Playlist from './Playlist';
import TopTracks from "./TopTracks"
import Recommendations from "./Recommendations"
import RecentlyPlayed from './RecentlyPlayed';

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
          <Route path="/recommendations" exact component={() => <Recommendations token={this.state.token} />} />
          <Route path="/recently-played" exact component={() => <RecentlyPlayed token={this.state.token} />} />
        </Switch>
        </Router>

        
        

          
        </main>
          
      </div>
      )
    }
  
}



export default App;
