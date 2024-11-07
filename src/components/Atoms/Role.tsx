import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Role } from '../../interfaces/rolesEnum';

interface Props {
    role: Role;
    fontSize: number;
    iconSize: number;
}

const RoleContainer = ({role, fontSize, iconSize}: Props) => {
  return (
    <View style={styles.container}>
    <Icon name='body' size={iconSize} style={{ color: '#656565' }} />
    <Text style={{ fontSize: fontSize, color: '#656565' }}>{role}</Text>
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

export default RoleContainer;