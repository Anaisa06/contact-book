import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useForm, useWatch, SubmitHandler } from "react-hook-form";
import { IRegister } from "../../interfaces/registerInterface";
import { RegisterNavigationProp } from "../../navigate/navigationTypes";
import { RegisterService } from "../../services/auth/authServices";

type FormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
};

export const useRegisterForm = () => {
    const [openModal, setOpenModal] = useState(false);
    const [modalText, setModalText] = useState('');

    const navigation = useNavigation<RegisterNavigationProp>();

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        try {
            const toSave: IRegister = {
                name: data.name,
                email: data.email,
                password: data.password,
                phoneNumber: data.phoneNumber
            } 

            const response = await RegisterService(toSave);
            if(response.statusCode === 201) {
                setModalText('Usuario registrado con éxito!')
            }
        } catch (error: any) {
            console.error('Error in register submit', error);
            if(error.status === 409) {
                setModalText('El email ya está registrado')
            } else {
                setModalText('Algo salió mal')
            }
        } finally {
            setOpenModal(true);
        }
    };

    const handleModalClose = () => {
        setOpenModal(false);
        navigation.navigate('Login')
    }

    const handleLoginButton = () => {
        navigation.navigate('Login');
    }

    return {
        onSubmit,
        openModal,
        modalText,
        handleLoginButton,
        setOpenModal,
        handleModalClose
    }

}