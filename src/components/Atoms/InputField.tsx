import React from 'react';
import { ControllerRenderProps, FieldError } from 'react-hook-form';
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
  label: string;
  field: ControllerRenderProps<any>;
  error?: FieldError;
  type?: KeyboardTypeOptions | undefined;
  isPassword?: boolean
}

const Inputfield = ({ label, field, error, type = 'default', isPassword = false }: Props) => {

  return (
    <View>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        onChangeText={field.onChange}
        value={field.value}
        placeholder={label}
        keyboardType={type}
        placeholderTextColor={'#AAA1C8'}
        secureTextEntry={isPassword}
        
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 10,
    borderWidth: 0.5,
    borderColor: '#967AA1',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    color: '#192A51'
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    textAlign: 'center'
  },
});

export default Inputfield;