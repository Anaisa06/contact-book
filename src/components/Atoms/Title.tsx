import { StyleSheet, Text, View } from "react-native"

const Title = () => {
    return (
        <View>
            <Text style={styles.text}>
                <Text style={styles.span}>Close</Text>
                ToYou
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#967AA1',
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20
    },
    span: {
        color: '#192A51'
    }
})

export default Title