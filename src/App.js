
import './App.css';
import Body from "./Body"

function App(){
    return (
      <div className="App">
        <h1 className="header">Spotify Stats App</h1>
        <main>
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
    );
  
}


export default App;
