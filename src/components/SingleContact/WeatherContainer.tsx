import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { IWeather } from '../../interfaces/weatherInterface'
import Icon from 'react-native-vector-icons/Ionicons'
// import { getWeatherIcon } from '../../services/weatherServices'
import useFetch from '../../hooks/useFetch'
import { ImageContainer } from '../Atoms/ImageContainer'

interface Props {
    currentWeather: IWeather;
}

const WeatherContainer = ({ currentWeather }: Props) => {


    const { main, weather } = currentWeather;

    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.infoContainer}>
                    <Icon name='thermometer' size={30} style={{color: '#967AA1'}} />
                    <Text style={styles.text}>{main.temp}°C</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Icon name='water-outline' size={30} style={{color: '#967AA1'}}/>
                    <Text style={styles.text}>{main.humidity}%</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <ImageContainer uri={iconUrl} size={30} />
                <Text style={styles.text}>{weather[0].description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        height: 100,
        width: '100%',
        borderRadius: 8,
        // borderColor: '#967AA1',
        backgroundColor: '#FAF9FF',
        // borderWidth: 1,
        elevation: 3,
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#424855'
    }
})

export default WeatherContainer;