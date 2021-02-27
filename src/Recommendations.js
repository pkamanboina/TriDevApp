import React from "react"

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
            fetch('https://api.spotify.com/v1/me/top/tracks', {
                headers: {'Authorization': 'Bearer ' + this.props.token}
              }).then(response => response.json()) 
              .then(data => this.setState({
                topTracks: data.items[0].track.name
              }))
              */

        fetch('https://api.spotify.com/v1/me/top/artists', {
        headers: {'Authorization': 'Bearer ' + this.props.token}
        }).then(response => response.json()) 
        .then(data => {
            const topArtist = data.items[0].id
            return fetch(`https://api.spotify.com/v1/artists/${topArtist}/related-artists`, {
                headers: {'Authorization': 'Bearer ' + this.props.token}
            }).then(response => response.json())
            .then(data => this.setState({
                recommended: data.artists.map(artist => {
                    return {
                        name: artist.name,
                    }
                })
                })) 
            })
    
        }


    render() {
        return (
            <div>
            {this.state.recommended ? 
            <div>
            
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
