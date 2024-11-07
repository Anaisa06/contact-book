import { StyleSheet, View } from 'react-native'
import MapView, { Marker, LatLng, Region } from 'react-native-maps'

interface Props {
    location?: LatLng;
    setLocation?: React.Dispatch<React.SetStateAction<LatLng | undefined>>;

}

const MapComponent = ({location, setLocation }: Props) => {

  const defaultLocation = {
    latitude: 6.219129692661363,
    longitude: -75.58361012412955,
  }

  const initialRegion = location ? location : defaultLocation;

  const handleMapPress = (event: any): void => {

    if (!setLocation) return;

    setLocation({...event.nativeEvent.coordinate});
  };

  return (
    <View style={styles.container}>
    <MapView
      style={styles.mapStyle}
      customMapStyle={mapStyle}
      initialRegion={{...initialRegion, latitudeDelta: 0.01, longitudeDelta: 0.01}}
      onPress={handleMapPress} 
      >
        <Marker        
        coordinate={initialRegion as LatLng}
        pinColor='tan'
        />
        
    </MapView>
  </View>
  )
}

const mapStyle = [
    {elementType: 'geometry', stylers: [{color: '#192A51'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#AAA1C8'}],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#625D72'}],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#D5C6E0'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#7D7693'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#F5E6E8'}],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#586A95'}],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#F5E6E8'}],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}],
    },
  ];

  const styles = StyleSheet.create({
      container: {
        width: '100%',
        height: '100%', 
        minHeight: 300,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 8,
        overflow: 'hidden',
      },
      mapStyle: {
        width: '100%',
        height: '100%',
      },
  });

export default MapComponent