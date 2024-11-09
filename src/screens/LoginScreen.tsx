import React from 'react'
import { SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RegisterForm from '../components/Register/registerForm'
import LoginForm from '../components/Login/LoginForm'

const LoginScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <LoginForm />

            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default LoginScreen