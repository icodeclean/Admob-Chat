import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import {auth, DB} from '../firebase'
import {Platform, StyleSheet, View} from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { MaterialIcons } from '@expo/vector-icons';
import {AdMobInterstitial} from 'expo-ads-admob';
import { Button } from 'react-native-elements';


const adUnitID = Platform.select({
    ios: 'ca-app-pub-3940256099942544/4411468910',
    android: 'ca-app-pub-3940256099942544/1033173712',
})

const interstitial = async () => {
    try{
        await AdMobInterstitial.setAdUnitID(adUnitID);
        await AdMobInterstitial.requestAdAsync();
        await AdMobInterstitial.showAdAsync();
    }
    catch(error){
        console.log(error);
    }
}

const SendButton = props => {
    return (
        <Send
            {...props}
            disabled={!props.text}
            containerStyle={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 3,
            }}
        >
            <MaterialIcons
                name="send"
                size={24}
                color={
                    props.text ? 'green' : 'grey'
                }
            />
        </Send>
    );
};

const Channel = ({ navigation, route: { params } }) => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({})

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser) {
                setUser(authUser);
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const unsubscribe = DB.collection('channels')
            .doc(params.id)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const list = [];
                snapshot.forEach(doc => {
                    list.push(doc.data());
                });
                setMessages(list);
            });

        return () => unsubscribe();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: params.title || 'Channel' });
    }, []);

    const messageSend = async messageList => {
        const newMessage = messageList[0];
        try {
            await DB.collection('channels')
                .doc(params.id)
                .collection('messages')
                .doc(newMessage._id)
                .set({
                    ...newMessage,
                    createdAt: Date.now(),
                });
        } catch (error) {
            alert(error);
        }
    };

    return (
        <View style ={styles.container}>

            <GiftedChat
                listViewProps={{
                    style: { backgroundColor: 'white' },
                }}
                placeholder="Enter a message..."
                messages={messages}
                user={{ _id: user?.uid, name: user.displayName, avatar: user.photoURL }}
                onSend={messageSend}
                alwaysShowSend={true}
                textInputProps={{
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    textContentType: 'none',
                    underlineColorAndroid: 'transparent',
                }}
                multiline={false}
                renderUsernameOnMessage={true}
                scrollToBottom={true}
                renderSend={props => <SendButton {...props} />}
            />
            <Button
                title="Interstitial Ad"
                onPress={interstitial}
            />
        </View>
    );
};

export default Channel;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})