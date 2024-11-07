import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Role } from '../../interfaces/rolesEnum';

interface Props {
    setRole: (option: Role) => void;
    role: Role | undefined;
}

const RolePicker = ({setRole, role}: Props) => {


    return (
        <View style={styles.container}>
            <TouchableOpacity
                key={Role.CLIENT}
                style={styles.optionContainer}
                activeOpacity={0.8}
                onPress={() => setRole(Role.CLIENT)}>
                <View style={styles.radioCircle}>
                    {role === Role.CLIENT && <View style={styles.selectedRb} />}
                </View>
                <Text style={styles.optionText}>{Role.CLIENT}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                key={Role.EMPLOYEE}
                style={styles.optionContainer}
                activeOpacity={0.8}
                onPress={() => setRole(Role.EMPLOYEE)}>
                <View style={styles.radioCircle}>
                    {role === Role.EMPLOYEE && <View style={styles.selectedRb} />}
                </View>
                <Text style={styles.optionText}>{Role.EMPLOYEE}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly' 
    },
    label: {
        marginBottom: 10,
        color: '#192A51',
        fontSize: 15,

    },
    optionContainer: {

        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 10 
    },
    radioCircle: {
        height: 15,
        width: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#967AA1',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    selectedRb: {
        height: 8,
        width: 8,
        borderRadius: 5,
        backgroundColor: '#192A51',
    },
    optionText: { 
        color: '#192A51',
        fontSize: 15
    },
});

export default RolePicker;
