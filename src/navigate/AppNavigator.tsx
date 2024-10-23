import { NavigationContainer } from "@react-navigation/native"
import StackNavigator from "./StackNavigator"

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}

export default AppNavigator;