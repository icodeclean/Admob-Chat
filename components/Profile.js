
import React, { useState} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Avatar,SimpleLineIcons } from 'react-native'
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const Profile = ({navigation}) => {

    const [displayName, setDisplayName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const update = () => {
        if (displayName === '' && imageUrl === '') {
            alert('Nothing to update!')
            return;
        }

        auth.currentUser.updateProfile({
            displayName: displayName || auth.currentUser.displayName,
            photoURL: imageUrl || auth.currentUser.photoURL,
        })
            .then(() => {
                alert('Update Successful');
                setDisplayName('');
                setImageUrl('');
            })
            .catch(error => alert(error.message));
    }

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        });
    };

    return (
        <KeyboardAvoidingView behavior='padding' style ={styles.container}>
            <StatusBar style ="light" />
            <Text>{auth.currentUser.displayName}</Text>
            <Image source = {{
                uri: auth?.currentUser?.photoURL,
            }}
                   style={{width: 200, height: 200}}
            />

            <View style ={styles.inputContainer}>
                <Input
                    placeholder="Username"
                    autoFocus
                    type = 'text'
                    value={displayName}
                    onChangeText={(text) => setDisplayName(text)}
                />
                <Input
                    placeholder='Image Url'
                    type ='text'
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={update}
                />
            </View>

            <Button containerStyle = {styles.button} onPress={update} title="Update Profile"/>

            <View style = {{ height: 100}}/>
        </KeyboardAvoidingView>
    );
}

export default Profile;

const styles = StyleSheet.create({
    inputContainer:{
        width: 300,
        marginTop: 10,

    },

    container:{
        flex: 1,
        alignItems : 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },

    button: {
        width: 200,
        marginTop: 10,
    },
})

