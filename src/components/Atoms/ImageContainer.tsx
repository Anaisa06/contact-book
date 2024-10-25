import { StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

export const ImageContainer = () => {
    return (
        <View style={styles.imageContainer}>
            <Icon name='person' size={75} style={{ color: '#192A51' }} />

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
})
