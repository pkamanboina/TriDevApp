import React from "react"

class RecommendedTracks extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }

    componentDidMount() {
        if(!this.props.token) 
            return;

            fetch('https://api.spotify.com/v1/me/top/artists', {
                headers: {'Authorization': 'Bearer ' + this.props.token}
            }).then(response => response.json()) 
            .then(artistData => {
                const topArtistID = artistData.items[0].id
                const genre = artistData.items[0].genres[0] 

                return fetch('https://api.spotify.com/v1/me/top/tracks', {
                    headers: {'Authorization': 'Bearer ' + this.props.token}                   
                }).then(response => response.json()) 
                .then(trackData => {
                    const topTrackID = trackData.items[0].id
        
                    return fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${topArtistID}&seed_genres=${genre}&seed_tracks=${topTrackID}`, {
                        headers: {'Authorization': 'Bearer ' + this.props.token}
                }).then(response => response.json())
                .then(recommended => this.setState({
                    recommendedTrack: recommended.tracks.map(track => {
                        return {
                            trackName: track.name,
                            preview: track.preview_url,
                            artist: track.artists.map(artist => {
                                return (
                                  artist.name + " "
                                )
                              })
                        }
                        })
                    }))
                 })
                })
            }

    render() {
        return (
            <div>
            {this.state.recommendedTrack ? 
            <div>
            
            <br />
            {this.state.recommendedTrack.map((track) => 
              <div>
                <p>
                    {track.trackName} - {track.artist}
                </p>
                <audio controls>
                     <source src={track.preview} />
                </audio>
                    
              </div>
              )}
            </div>
          : []
          }
          <br />
            
          </div>
        
        )
    }
}
export default RecommendedTracks