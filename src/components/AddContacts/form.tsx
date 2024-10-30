import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, View, ViewComponent } from 'react-native';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Inputfield from '../Atoms/InputField';
import { IContact } from '../../interfaces/contactInterface';
import SubmitButton from '../Atoms/submitButton';
import { getContacts, saveContact } from '../../services/contactsServices';
import { useState } from 'react';
import ConfirmationModal from '../molecules/confirmationModal';
import { AddContactNavigationProp, UpdateContactNavigationProp } from '../../navigate/navigationTypes';
import ImagePicker from '../molecules/imagePicker';


interface IFormInput {
    name: string;
    email: string;
    phoneNumber: string;
    role: 'client' | 'employee'
}

interface Props {
    contact?: IContact;
    navigator: AddContactNavigationProp | UpdateContactNavigationProp;
}

const ContactForm = ({ contact, navigator }: Props) => {

    const [openModal, setOpenModal] = useState(false);
    const [modalText, setModalText] = useState('');
    const [imageUri, setImageUri] = useState('');

    const handleImageChange = (image: string) => {
        setImageUri(image);
    }

    const { control, handleSubmit, formState: { errors }
    } = useForm<IFormInput>();

    const handleModalClose = () => {
        setOpenModal(false)
        navigator.navigate('AllContacts');
    }

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const contacts = await getContacts();
            let updatedContacts = [...contacts];

            if (contact) {
                updatedContacts = contacts.filter((item) => item.id != contact.id)
            }

            const toSave = {
                ...data,
                id: contact ? contact.id : Math.floor(Math.random() * 1000).toString(),
                image: imageUri ? imageUri : contact?.image
            }


            updatedContacts.push(toSave);
            await saveContact(updatedContacts);

            setModalText('Guardado con éxito')

        } catch (error) {
            console.error('Error saving contact from the form', error);
            setModalText('Algo salió mal')
        } finally {
            setOpenModal(true);
        }
    }



    return (

        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <ImagePicker handleImageChange={handleImageChange} contact={contact} />
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

                    <SubmitButton text='Guardar' handleSubmit={handleSubmit(onSubmit)} />

                    <ConfirmationModal onClose={handleModalClose} openModal={openModal} text={modalText} />

                </View>
                </ScrollView>
                </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
      },
    container: {
        display: 'flex',
        gap: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
        width: '90%',
        height: '100%',
        padding: 20,
        margin: 20,
        borderRadius: 8,
        elevation: 3,
    }
})

export default ContactForm;