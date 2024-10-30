import { StyleSheet, View } from "react-native"
import { ImageContainer } from "../Atoms/ImageContainer"
import SubmitButton from "../Atoms/submitButton"
import React, { useEffect, useState } from "react"
import { selectImageFromGallery, takePhoto } from "../../services/imagesServices";
import { IContact } from "../../interfaces/contactInterface";

interface Props {
    handleImageChange: (image: string) => void;
    contact?: IContact
}

const ImagePicker = ({ handleImageChange, contact }: Props) => {

    const [image, setImage] = useState(contact?.image);

    const handleTakeImage = async () => {
        const imageUri = await takePhoto();

        if (!imageUri) return;

        setImage(imageUri)
        handleImageChange(imageUri);
    }

    const handleSelectImage = async () => {
        const imageUri = await selectImageFromGallery();

        if (!imageUri) return;

        setImage(imageUri)
        handleImageChange(imageUri);
    }


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageContainer uri={image} size={150}/>
            </View>
            <View style={styles.buttonContainer}>
                <SubmitButton text='Seleccionar imagen' handleSubmit={handleSelectImage} />
                <SubmitButton text='Tomar foto' handleSubmit={handleTakeImage} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',

    },
    imageContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        width: '100%', // Ajusta esto según el espacio necesario para los botones
    },
});

export default ImagePicker;