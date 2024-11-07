import { AndroidPermission, check, Permission, PERMISSIONS, request } from "react-native-permissions";


const verifyPermissions = async (requiredPermission: AndroidPermission): Promise<Boolean> => {
    try {
        const result = await check(requiredPermission);

        console.log('Resultado de verify: ', result)

        if (result === 'granted') {
            return true;
        }

        return await requestPermission(requiredPermission);        
        
    } catch (error) {
        console.log('Error checking permissions', error);
        return false;
    }
}

const requestPermission = async (requiredPermission: AndroidPermission): Promise<Boolean> => {
    try {
        const result = await request(requiredPermission);
        console.log('Resultado de request: ', result)

        return result === 'granted';
    } catch (error) {
        console.log('Error requesting permissions', error);
        return false;
    }
}

export default verifyPermissions;