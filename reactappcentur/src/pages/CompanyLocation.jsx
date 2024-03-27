import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends Component {
    state = {
        position: null
    };

    componentDidMount() {
        // Geocode the address and update state with the position
        this.geocodeAddress();
    }

    geocodeAddress = () => {
        const { google } = this.props;
        const geocoder = new google.maps.Geocoder();
        const address = 'Unit B, PSMID Building, 116-9th Avenue, Quezon City, Philippines';

        geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK') {
                const location = results[0].geometry.location;
                this.setState({ position: location });
            } else {
                console.error('Geocode was not successful for the following reason:', status);
            }
        });
    };

    render() {
        const { position } = this.state;
        if (!position) return null;

        return (
            <Map
                google={this.props.google}
                zoom={13}
                style={{ width: '97%', height: '370px' }}
                initialCenter={{
                    lat: position.lat(),
                    lng: position.lng()
                }}
                
                mapTypeControl={false} // Disable the map type control
                mapTypeId={'satellite'} // Set the map type to satellite view
            >
                <Marker position={{ lat: position.lat(), lng: position.lng() }} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCgkagHMrocg_Wc61Ay4KLSY-AkGUBCaLo'
})(MapContainer);
