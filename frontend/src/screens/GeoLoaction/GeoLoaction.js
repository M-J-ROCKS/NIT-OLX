import React, { Component } from 'react'

export class GeoLoaction extends Component {
    constructor(props){
        super(props)
        this.state={
            latitude:null,
            longitude:null,
            userAddress:null
        }
        this.getLocation=this.getLocation.bind(this)
        this.getCoordinates=this.getCoordinates.bind(this)
        this.reverseGeocodeCoordinates=this.reverseGeocodeCoordinates.bind(this)
    }
    
    reverseGeocodeCoordinates(){
        fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=AIzaSyAnjfphIlHKPVd2VL2L7e6zLFWIL_SnU_E`)
        .then(response=>response.json())
        .then(data=>this.setState({
            userAddress:data.results[0].formatted
        }))
        .error(error=>alert(error))
    }
    getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.getCoordinates,yhis.handleLocationError);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
    }
    getCoordinates(position){
        this.setState({
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
        this.reverseGeocodeCoordinates()
    }

    handleLocationError(error){
        switch(error.code) {
            case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.")
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.")
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.")
              break;
            case error.UNKNOWN_ERROR:
              alert("An unknown error occurred.")
              break;
            default:
                alert("An unknown error occurred")  
          }
    }
    render() {
    return (
        <div>
            <div>GeoLoaction</div>
            <button onClick={this.getLoaction}>Get coordinates</button>
            <h4>HTML5 coordinates</h4>
            <p>Latitude: {this.state.latitude}</p>
            <p>Longitude: {this.state.longitude}</p>
            <p>Address:{this.state.userAddress}</p>
            {this.state.latitude&&this.state.longitude?
                <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&senson=false&markers=color:red%7C${this.state.latitude},${this.state.longitude}&key=AIzaSyAnjfphIlHKPVd2VL2L7e6zLFWIL_SnU_E`} alt=''/>
                :
                null
            }
        </div>
    )
  }
}

export default GeoLoaction