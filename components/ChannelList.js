import React, { useState, useEffect  } from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import  {DB} from  '../firebase';
import {AdMobRewarded} from "expo-ads-admob";
import { Button } from 'react-native-elements';

const adUnitID = Platform.select({
    ios: 'ca-app-pub-3940256099942544/1712485313',
    android: 'ca-app-pub-3940256099942544/5224354917',
})

const rewarded = async () => {
    try{
        await AdMobRewarded.setAdUnitID(adUnitID);
        await AdMobRewarded.requestAdAsync();
        await AdMobRewarded.showAdAsync();
    }
    catch(error){
        console.log(error);
    }
}

const Item = React.memo(
    ({ item: { id, title, createdAt}, onPress }) => {

        return (
            <TouchableOpacity style ={styles.itemContainer} onPress={() => onPress({ id, title })}>
                <View style ={styles.textContainer}>
                    <Text style ={styles.text}>{title}</Text>
                </View>
                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={20}
                    color={"black"}
                />
            </TouchableOpacity>
        );
    }
);

const ChannelList = () => {
    const navigation = useNavigation();
    const [channels, setChannels] = useState([]);

        useEffect(() => {
            const unsubscribe = DB.collection('channels')
                .orderBy('createdAt', 'desc')
                .onSnapshot(snapshot => {
                    const list = [];
                    snapshot.forEach(doc => {
                        list.push(doc.data());
                    });
                    setChannels(list);
                });

            return () => unsubscribe();
        }, []);

    const itemPress= params => {
        navigation.navigate('Channel', params);
    };

        return (
            <View style ={styles.container}>
                <FlatList
                    keyExtractor={item => item['id']}
                    data={channels}
                    renderItem={({ item }) => (
                        <Item item={item} onPress={itemPress} />
                    )}
                    windowSize={3}
                />
                <Button
                    title="rewarded Ad"
                    onPress={rewarded}
                />
            </View>
        );
};

export default ChannelList;

const styles = StyleSheet.create({
    inputContainer:{
        width: 300,
        marginTop: 10,
    },
    container:{
        flex: 1,
        backgroundColor: 'white',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'orange',
        padding: 15,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    text: {
        fontSize: 20,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})
