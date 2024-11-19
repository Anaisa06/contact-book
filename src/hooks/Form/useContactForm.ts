import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getUser } from "../../services/auth/authServices";
import { saveContact } from "../../services/contactsServices";
import { Role } from "../../interfaces/rolesEnum";
import { IContact } from "../../interfaces/contactInterface";
import { AddContactNavigationProp, UpdateContactNavigationProp } from "../../navigate/navigationTypes";

interface IFormInput {
    name: string;
    email: string;
    phoneNumber: string;
    role: 'client' | 'employee'
}

export const useContactForm = (navigator: AddContactNavigationProp | UpdateContactNavigationProp, contact?: IContact) => {
    
    const contactLocation = {
        latitude:  Number (contact?.latitude),
        longitude: Number (contact?.longitude)
    }

    const [openModal, setOpenModal] = useState(false);
    const [modalText, setModalText] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [location, setLocation] = useState(contact? contactLocation : undefined);
    const [role, setRole] = useState<Role | undefined>(contact?.role);

    console.log('LOCATION', location)

    const handleImageChange = (image: string) => {
        setImageUri(image);
    }

    const handleModalClose = () => {
        setOpenModal(false)
        navigator.navigate('AllContacts');
    }

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const user = await getUser();

            const toSave = {
                ...data,
                id: contact?.id,
                imageUri: imageUri ? imageUri : contact?.imageUri,
                location: location,
                role: role
            }

            const  savedContact = await saveContact(toSave, user);
            
            if(savedContact.statusCode === 201 || savedContact.statusCode === 200) {
                setModalText('Guardado con éxito')
            }

        } catch (error) {
            console.error('Error saving contact from the form', error);
            setModalText('Algo salió mal')
        } finally {
            setOpenModal(true);
        }
    }

    return {
        handleImageChange,
        role,
        setRole,
        location,
        setLocation,
        onSubmit,
        handleModalClose,
        openModal,
        modalText
    }
}