import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './components/AuthStack';
import MainStack from './components/MainStack';
import {auth} from "./firebase";

export default function App() {
  const [user, setUser] = useState({})
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser) {
        setUser(authUser);
      }
    });
    return unsubscribe;
  }, []);

  return (
  <NavigationContainer>
    {user?.uid ? <MainStack user={user}/> : <AuthStack />}
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
