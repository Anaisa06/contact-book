import { useNavigation, CommonActions } from "@react-navigation/native";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginNavigationProp } from "../../navigate/navigationTypes";
import { LoginService } from "../../services/auth/authServices";

interface FormData {
    email: string;
    password: string;
}

export const useLoginForm = () => {
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
    return {
        navigation,
        onSubmit,
        modal,
        modalText,
        setOpenModal
    }
}