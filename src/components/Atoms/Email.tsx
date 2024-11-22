import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface Props {
    email?: string;
    fontSize: number;
    iconSize: number;
}

const Email = ({email, fontSize, iconSize}: Props) => {
  return (
    <View style={styles.container}>
    <Icon name='mail' size={iconSize} style={{ color: '#656565' }} />
    <Text style={{ fontSize: fontSize, color: '#656565' }}>{email ? email : 'Email no registrado'}</Text>
</View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        maxHeight: 50,
        overflow: 'scroll'

    },
})

export default Email