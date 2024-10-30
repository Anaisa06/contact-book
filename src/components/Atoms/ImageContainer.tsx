import { Image, StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { IContact } from "../../interfaces/contactInterface"
import { ImageURISource } from "react-native";

interface Props {

    uri?: string;
    size?: number;
}

export const ImageContainer = ({ uri, size = 80 }: Props) => {

    return (
        <View style={[styles.imageContainer, { width: size, height: size }]}>

            {
                uri 
                ? <Image source={{uri}} style={styles.image}
                  resizeMode='contain' />
                : <Icon name='person' size={75} style={{ color: '#192A51' }} />
            }
            

        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 100,
        height: 70,
        width: 70,
        overflow: 'hidden',
        backgroundColor: '#D5C6E0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
})
