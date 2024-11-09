import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ScrollView, Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Title from '../Atoms/Title';
import Inputfield from '../Atoms/InputField';
import SubmitButton from '../Atoms/submitButton';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { LoginNavigationProp } from '../../navigate/navigationTypes';
import { LoginService } from '../../services/auth/authServices';
import ConfirmationModal from '../molecules/confirmationModal';

interface FormData {
    email: string;
    password: string;
}

const LoginForm = () => {

    const [modal, setOpenModal] = useState(false);
    const [modalText, setModalText] = useState('');

    const navigation = useNavigation<LoginNavigationProp>();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        try {
            const response = await LoginService(data);
            if(response.statusCode === 201) {
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'AllContacts' }],
                    })
                  );
            }
        } catch (error: any) {
            console.log('Error in login submit', error);
            if (error.status === 400 ) {
                setModalText('Las credenciales no son válidas')
            } else {
                setModalText('Algo salió mal')
            }
            setOpenModal(true);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Title />
            <Text style={styles.title}>Ingresar</Text>
            <Controller
                control={control}
                name="email"
                rules={{
                    required: 'El email es requerido',
                    pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' }
                }}
                render={({ field }) => (
                    <Inputfield label='Email' field={field} error={errors.email} type='email-address' />
                )}
            />
            <Controller
                name="password"
                control={control}
                rules={{
                    required: 'La contraseña es requerida',
                    minLength: {
                        value: 6,
                        message: 'La contraseña debe contener al menos 6 caracteres'
                    }
                }}
                render={({ field }) => (
                    <Inputfield field={field} label='Contraseña' error={errors.password} isPassword={true} />
                )}
            />
            <SubmitButton text='Ingresar' handleSubmit={handleSubmit(onSubmit)} />
            <SubmitButton text='Registrarse' handleSubmit={() => navigation.navigate('Register')}/>
            <ConfirmationModal openModal={modal} onClose={() => setOpenModal(false)} text={modalText} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
        gap: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#AAA1C8'
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginForm