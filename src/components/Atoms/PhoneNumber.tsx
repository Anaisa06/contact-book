import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'


interface Props {
    phoneNumber: string;
    iconSize: number;
    fontSize: number;
}

const PhoneNumber = ({phoneNumber, iconSize, fontSize}: Props) => {
  return (
    <View style={styles.number}>
    <Icon name='phone' size={iconSize} style={{ color: '#656565' }} />
    <Text style={{ fontSize: fontSize, color: '#656565' }}>{phoneNumber}</Text>
</View>
  )
}

const styles = StyleSheet.create({
    number: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',

    },
})

export default PhoneNumber