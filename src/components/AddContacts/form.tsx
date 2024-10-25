import { StyleSheet, Text, TouchableHighlight, View, ViewComponent } from 'react-native';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Inputfield from '../Atoms/InputField';
import { IContact } from '../../interfaces/contactInterface';
import SubmitButton from '../Atoms/submitButton';
import { getContacts, saveContact } from '../../services/contactsServices';


interface IFormInput {
    name: string;
    email: string;
    phoneNumber: string;
    role: 'client' | 'employee'
}

interface Props {
    contact?: IContact;
}

const ContactForm = ({ contact }: Props) => {

    const { control, handleSubmit, formState: { errors }
    } = useForm<IFormInput>();

    

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const contacts =  await getContacts();
        const toSave = {
            ...data,
            id: contact ? contact.id : Math.floor(Math.random() * 1000).toString()
        }
        contacts.push(toSave);
        saveContact(contacts);
    }





    return (
        <View style={styles.container}>
            <Controller name='name' control={control} defaultValue={contact ? contact.name : ''} rules={{
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

            <Controller name='email' control={control} defaultValue={contact ? contact.email : ''} rules={{
                required: {
                    value: true,
                    message: 'Campo requerido'
                },
                pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'El email debe tener un formato válido',
                },
            }} render={({ field }) => (
                <Inputfield label='Email' field={field} error={errors.email} type={'email-address'} />
            )}
            />

            <Controller name='phoneNumber' control={control} defaultValue={contact ? contact.phoneNumber : ''} rules={{
                required: {
                    value: true,
                    message: 'Campo requerido'
                },
                pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'El numero debe tener un formato válido',
                },
            }} render={({ field }) => (
                <Inputfield label='Número de celular' field={field} error={errors.phoneNumber} type={'phone-pad'} />
            )}
            />

            <SubmitButton text='Guardar' handleSubmit={handleSubmit(onSubmit)}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
        width: '90%',
        height: '95%',
        padding: 20,
        margin: 20,
        borderRadius: 8,
        elevation: 3,
    }
})

export default ContactForm;