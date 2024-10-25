import { StyleSheet, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'

interface Props {
    handlePress: () => void
}

const AddBtnComponent = ({handlePress}: Props) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.9} onPress={handlePress}>
        <Icon name='person-add' size={45} style={{color: '#D5C6E0'}}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create ({
    buttonContainer: {
        borderRadius: 50,
        height: 70,
        width: 70,
        overflow: 'hidden',
        backgroundColor: '#192A51',
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        

    }
})

export default AddBtnComponent