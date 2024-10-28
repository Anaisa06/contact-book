import { View } from "react-native"
import { ImageContainer } from "../Atoms/ImageContainer"
import SubmitButton from "../Atoms/submitButton"
import React, { useState } from "react"
import { selectImageFromGallery, takePhoto } from "../../services/imagesServices";
import { IContact } from "../../interfaces/contactInterface";

interface Props {
    handleImageChange: (image: string) => void;
    contact?: IContact
}

const ImagePicker = ({handleImageChange, contact}: Props) => {

    const handleTakeImage = async () => {
        const imageUri = await takePhoto();

        if(!imageUri) return; 

        handleImageChange(imageUri);
    }

    const handleSelectImage = async () => {
        const imageUri = await selectImageFromGallery();

        if(!imageUri) return; 

        handleImageChange(imageUri);
    }

    return (
        <View>
            <ImageContainer contact={contact} />
            <View>
                <SubmitButton text='Seleccionar imagen' handleSubmit={handleSelectImage}/>
                <SubmitButton text='Tomar foto' handleSubmit={handleTakeImage}/>
            </View>
        </View>
    )
}

export default ImagePicker;