import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ImageBackground, Alert } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { windowHeight, windowWidth } from '../utils/Dimensions';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import bgImg from '../assets/bgImg.png';
import Firebase from '../utils/Firestore/Firebase';
//Import Yup
import * as Yup from 'yup';

//Import Formik
import { Formik } from 'formik';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter a registered email'),
    password: Yup.string()
        .label('Password')
        .required()
        .min(8, 'Password must have at least 6 characters ')
})

export default function LoginScreen({ navigation }) {
    const { login, reset } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const performLogin = async (email, password) => {
        let userData = await Firebase.getUserByEmail(email)
        if(userData && userData.userType == "Owner"){
            console.log("Performing Login")
            const response = await login(email, password)
            if(!response.user){
                Alert.alert("Invalid Login", `Sorry, your entered invalid credentials.`)
            }
        }else{
            console.log("Didn't Login")
            Alert.alert("Invalid Role", "The email is not associated with Owner privilages.")
        }
        
    }

    const performResetPassword = async (email) => {
        let emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        let emailValidity =  await emailregex.test(email);
        if(!emailValidity){
            Alert.alert("Invalid Email","The email address entered is invalid")
            return;
        }
        let userData = await Firebase.getUserByEmail(email)
        if(userData && userData.userType == "Owner"){
            console.log("Performing Reset")
            const response = await reset(email)
            console.log("Reset Response ",response)
            Alert.alert("Recovery link sent", `Password reset information was sent to ${email}`)
        }else{
            Alert.alert("Invalid Role", "The email is not associated with Owner privilages.")
        }
        
    }
    return (

        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
            enabled
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground source={bgImg} style={styles.container}>
                    <Formik
                        initialValues={
                            { email: "", password: "" }
                        }
                        onSubmit={(values, actions) => handleOnSubmit(values, actions)}
                        validationSchema={validationSchema}
                        validateOnMount={true}
                    >
                        {
                            ({ handleChange, handleSubmit, values, errors, setFieldTouched, touched, isValid }) => (
                                <View style={{ alignItems: "center", alignContent: "center", marginTop: windowHeight * 0.5 }}>
                                    <Input
                                        onChangeText={handleChange('email')}
                                        onBlur={() => setFieldTouched('email')}
                                        value={values.email}
                                        placeholder='Your Email'
                                        leftIcon={
                                            <Icon
                                                name='user'
                                                size={24}
                                                color='grey'
                                            />
                                        }
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                        inputContainerStyle={styles.input}
                                        placeholderTextColor="white"
                                        errorMessage={touched.email && errors.email?errors.email:null}
                                        errorStyle={styles.errorText}
                                        style={{color:"white"}}
                                    />

                                    <Input
                                        leftIcon={
                                            <Icon
                                                name='lock'
                                                size={24}
                                                color='grey'
                                            />
                                        }
                                        rightIcon={
                                            <Icon
                                                name={showPass ? "eye-slash" : "eye"}
                                                size={24}
                                                color='gold'
                                                onPress={() => setShowPass(!showPass)}
                                            />
                                        }
                                        placeholderText='Password'
                                        secureTextEntry={!showPass}
                                        inputContainerStyle={styles.input}
                                        onChangeText={handleChange('password')}
                                        onBlur={() => setFieldTouched('password')}
                                        value={values.password}
                                        errorMessage={touched.password && errors.password?errors.password:null}
                                        errorStyle={styles.errorText}
                                        style={{color:"white"}}
                                    />
                                    { isValid &&
                                        <FormButton
                                            buttonTitle='Login'
                                            onPress={() => performLogin(values.email, values.password)}
                                        />
                                    }

                                    <TouchableOpacity
                                        style={styles.navButton}
                                        onPress={() => navigation.navigate('Signup')}
                                    >
                                        <Text style={styles.signUpText}>New user? Join here</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.navButton}
                                        onPress={() => performResetPassword(values.email)}
                                    >
                                        <Text style={styles.signUpText}>Forgot Password. Reset Here</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                    </Formik>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight,
        width: windowWidth,
        flex: 1,
        resizeMode: "cover",
    },
    text: {
        fontSize: 24,
        marginBottom: 10
    },
    navButton: {
        marginTop: 15
    },
    navButtonText: {
        fontSize: 20,
        color: '#6646ee'
    },
    input: {
        alignSelf: "center",
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: windowWidth - 55,
        height: windowHeight / 15,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: "rgba(0,0,0,0.35)",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    bgImg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowWidth,
        height: windowHeight,
    },
    errorText:{
        alignContent:"center",
        alignSelf:"center",
        alignContent:"center",
        fontSize: 12,
        color: 'orange',
        fontWeight: "500"
    },
    signUpText:{
        fontSize: 16,
        color: 'orange',
        fontWeight: "500"
    }
});