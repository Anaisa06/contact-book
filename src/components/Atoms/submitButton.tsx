import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
    text: string;
    handleSubmit: () => void;
}

const SubmitButton = ({ handleSubmit, text }: Props) => {
    return (
      <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#192A51',
      width: '45%',
      height: 50,
      borderRadius: 8, 
      alignItems: 'center', 
      justifyContent: 'center',
      elevation: 5, 
      alignSelf: 'center'

    },
    buttonText: {
      color: '#F5E6E8', 
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center'
    },
  });

  export default SubmitButton;