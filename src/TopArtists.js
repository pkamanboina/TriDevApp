import React from "react"
import "./TopArtists.css"

class TopArtists extends React.Component {
    constructor() {
        super()
        this.state = {
            
        }
    }

    componentDidMount() {
        

        if (!this.props.token)
            return;
        

        fetch('https://api.spotify.com/v1/me/top/artists', {
            headers: {'Authorization': 'Bearer ' + this.props.token}
        }).then(response => response.json()) 
        .then(data => this.setState({
            topArtists: data.items.map(artist => {
            return {
                name: artist.name,
                imageUrl: artist.images[2].url
            }
        })
        })) 
    }

    render() {
        return (
            <div>
            {this.state.topArtists ? 
            <div className = "topArtists">
            
            <h3>Top Artists:</h3>
            <br />
            {this.state.topArtists.map(artist => 
              <div>
                  <div>
                  <img src = {artist.imageUrl}></img>
                  </div>
                  <p>{artist.name}</p>
              </div>
              )}
            </div>
          : []
          }
          </div>
        
        )
    }
}

export default TopArtists