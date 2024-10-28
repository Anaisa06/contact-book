import { Image, StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { IContact } from "../../interfaces/contactInterface"

interface Props {
    contact?: IContact;
}

export const ImageContainer = ({ contact }: Props) => {

    const uri = contact?.image

    return (
        <View style={styles.imageContainer}>

            {
                contact?.image 
                ? <Image source={{uri}} style={styles.image}
                  resizeMode='contain' />
                : <Icon name='person' size={75} style={{ color: '#192A51' }} />
            }
            

        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 50,
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
