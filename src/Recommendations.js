import React from "react"
import "./TopTracks.css"

class Recommendations extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        if(!this.props.token) 
            return;

        /*
        This is not fetching the artist id for some odd reason
        
        fetch('https://api.spotify.com/v1/me/top/artists', {
        headers: {'Authorization': 'Bearer ' + this.props.token}
        }).then(response => response.json()) 
        .then(data => this.setState({
            topArtists: data.items.map(artist => {
            return {
                artistID: artist.id,
            }
        })
        })) 

            fetch('https://api.spotify.com/v1/me/top/tracks', {
                headers: {'Authorization': 'Bearer ' + this.props.token}
              }).then(response => response.json()) 
              .then(data => this.setState({
                topTracks: data.items[0].track.name
              }))
              */
    
  
        const example = "0TnOYISbd1XYRBk9myaseg"
        const endpoint = "https://api.spotify.com/v1/artists/" + example + "/related-artists"
        const res = endpoint.replace(/ /g, '')
        
        fetch(res, {
            headers: {'Authorization': 'Bearer ' + this.props.token}
        }).then(response => response.json())
        .then(data => this.setState({
            recommended: data.artists.map(artist => {
                return {
                    name: artist.name,
                }
            })
            })) 
        }


    render() {
        return (
            <div>
            {this.state.recommended ? 
            <div className = "topArtists">
            
            <h3>Recommended Artists:</h3>
            <br />
            {this.state.recommended.map(artists => 
              <div>
                  <p>{artists.name}</p>
              </div>
              )}
            </div>
          : []
          }
          </div>
        
        )
    }
}

export default Recommendations
