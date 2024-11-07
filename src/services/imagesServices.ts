import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import verifyPermissions from "../utlities/permissions";
import { PERMISSIONS } from "react-native-permissions";

export const selectImageFromGallery = async () => {
    try {

        const permission = await verifyPermissions(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);

        if (permission) {
            const response = await launchImageLibrary({
                mediaType: 'photo'
            })

            if (response.didCancel || !response.assets?.length) return;

            const image = response.assets[0]

            return image.uri;
        }
    } catch (error) {
        console.error('Error selecting image:', error);
    }
}

export const takePhoto = async () => {
    try {
        const permission = await verifyPermissions(PERMISSIONS.ANDROID.CAMERA)
        if (permission) {
            const response = await launchCamera({
                mediaType: 'photo',
                cameraType: 'front'
            })

            if (response.didCancel || !response.assets?.length) return;

            const image = response.assets[0]

            return image.uri;
        }
    } catch (error) {
        console.error('Error taking photo:', error);
    }
}