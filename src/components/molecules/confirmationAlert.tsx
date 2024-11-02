
import { Alert } from 'react-native';

interface Props {
    title: string;
    text: string;
    confirmFunction: () => void;
}

const confirmationAlert = ({title, text, confirmFunction}: Props) => {


        Alert.alert(
            title,
            text,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: confirmFunction
                },
            ],
            { cancelable: false } // Opcional: Esto evitará que el alert se cierre si se toca fuera de él
        )
}

export default confirmationAlert