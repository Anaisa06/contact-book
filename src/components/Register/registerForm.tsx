import React from 'react'
import { useForm, useWatch, SubmitHandler, Controller } from 'react-hook-form';
import { ScrollView, Text, StyleSheet } from 'react-native';
import Inputfield from '../Atoms/InputField';
import SubmitButton from '../Atoms/submitButton';
import Title from '../Atoms/Title';
import { useNavigation } from '@react-navigation/native';
import { RegisterNavigationProp } from '../../navigate/navigationTypes';
import { IRegister } from '../../interfaces/registerInterface';
import { RegisterService } from '../../services/auth/authServices';

type FormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;

};

const RegisterForm = () => {

    const navigation = useNavigation<RegisterNavigationProp>();

    const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const password = useWatch({ control, name: 'password', defaultValue: '' });

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        try {
            const toSave: IRegister = {
                name: data.name,
                email: data.email,
                password: data.password,
                phoneNumber: data.phoneNumber
            } 

            const response = await RegisterService(toSave);
            console.log('This is response', response);

        } catch (error) {
            console.log(error);
        }
    };

    const handleLoginButton = () => {
        navigation.navigate('Login');
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Title/>
            <Text style={styles.text}>Registrarse</Text>
            <Controller
                name='name'
                control={control}
                defaultValue=''
                rules={{
                    required: {
                        value: true,
                        message: 'Campo requerido'
                    },
                    minLength: {
                        value: 2,
                        message: 'El nombre debe ser mayor a 2 letras'
                    }
                }} render={({ field }) => (
                    <Inputfield label='Nombre' field={field} error={errors.name} />
                )}
            />
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
                name='phoneNumber'
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'Campo requerido'
                    },
                    pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'El numero debe tener diez caracteres',
                    },
                }} render={({ field }) => (
                    <Inputfield label='Número de celular' field={field} error={errors.phoneNumber} type={'phone-pad'} />
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
            <Controller
                name="confirmPassword"
                control={control}
                rules={{
                    required: 'Es necesario confirmar la contraseña',
                    validate: (value) => value === password || 'Las contraseñas no son iguales'
                }}
                render={({ field }) => (
                    <Inputfield label="Confirmar contraseña" field={field} error={errors.confirmPassword} isPassword={true}/>
                )}
            />
            <SubmitButton text="Registrarse" handleSubmit={handleSubmit(onSubmit)} />
            <SubmitButton text="Ingresar" handleSubmit={handleLoginButton} />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
        gap: 10
    },
    text: {
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


export default RegisterForm