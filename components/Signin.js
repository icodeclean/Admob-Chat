import React, { useState, useEffect } from 'react'
import {StyleSheet, Text, View, KeyboardAvoidingView, Platform} from 'react-native'
import { Button, Input, Image} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';
import {AdMobBanner, AdMobRewarded} from "expo-ads-admob";

const adUnitID = Platform.select({
    ios: 'ca-app-pub-3940256099942544/2934735716',
    android: 'ca-app-pub-3940256099942544/6300978111',
})

const banner = async () => {
    try{
        await AdMobBanner.setAdUnitID(adUnitID);
        await AdMobBanner.requestAdAsync();
        await AdMobBanner.showAdAsync();
    }
    catch(error){
        console.log(error);
    }
}

const Signin = ({ navigation }) => {
    const [username, setUsername] = useState('');

    const signIn = () => {
        auth.signInAnonymously()
            .then(() => {
                console.log('Signin Success')
                auth.currentUser.updateProfile({
                    displayName: username || auth.currentUser.displayName,
                    photoURL: 'https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png'
                })
                    .then(() => alert('Update Successful'))
                    .catch(error => alert(error.message));
            })
            .catch((error) => {
                console.log(error)
            });

    }

    return (
        <KeyboardAvoidingView behavior='padding' style ={styles.container}>
            <StatusBar style ="light" />
            <View style ={styles.inputContainer}>
                <Input
                    placeholder="Username"
                    autoFocus
                    type = 'username'
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>

            <Button containerStyle = {styles.button} onPress={signIn} title="Sign in"/>
            <AdMobBanner bannerSize="largeBanner"
                         adUnitID={adUnitID}
                         onDidFailToReceiveAdWithError={() => console.log('error with admob banner')}
            />
            <View style = {{ height: 100}}/>
        </KeyboardAvoidingView>
    );
}

export default Signin;

const styles = StyleSheet.create({
    inputContainer:{
        width: 300,
    },

    container:{
        flex: 1,
        alignItems : 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },

    googleButton: {
        width: 200,
    },

    button: {
        width: 200,
        marginBottom: 50
    },
})
