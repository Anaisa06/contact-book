import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Controller, useForm } from "react-hook-form";
import Inputfield from '../Atoms/InputField';
import { IContact } from '../../interfaces/contactInterface';
import SubmitButton from '../Atoms/submitButton';
import ConfirmationModal from '../molecules/confirmationModal';
import { AddContactNavigationProp, UpdateContactNavigationProp } from '../../navigate/navigationTypes';
import ImagePicker from '../molecules/imagePicker';
import MapComponent from '../molecules/MapComponent';
import RolePicker from '../molecules/rolePicker';
import { useContactForm } from '../../hooks/Form/useContactForm';

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

    const { control, handleSubmit, formState: { errors }
    } = useForm<IFormInput>();

    const {
        handleImageChange,
        role,
        setRole,
        location,
        setLocation,
        onSubmit,
        handleModalClose,
        openModal,
        modalText
    } = useContactForm(navigator, contact);

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

                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: 'El email debe tener un formato válido',
                        },
                    }} render={({ field }) => (
                        <Inputfield label='Email' field={field} error={errors.email} type={'email-address'} />
                    )}
                    />

                    <Controller name='phoneNumber' control={control} defaultValue={contact ? contact.phoneNumber : ''} rules={{

                    }} render={({ field }) => (
                        <Inputfield label='Número de celular' field={field} error={errors.phoneNumber} type={'phone-pad'} />
                    )}
                    />

                    <RolePicker role={role} setRole={setRole}/>

                    <MapComponent location={location} setLocation={setLocation}/>

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