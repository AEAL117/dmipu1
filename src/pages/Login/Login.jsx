import React from "react"; 
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import ButtonComponent from "../../components/Button";
import { Linking } from 'react-native';

import { styles } from "./Login.styles";

export default function LoginScreen({ onPress }){
    return (
        <View style={styles.container}>
            <StatusBar />
            <Text>Bien venido</Text>
            <Text style={{color: 'blue'}}
                onPress={() => Linking.openURL('https://github.com/AEAL117/dmipu1')}>
                GitHub
            </Text>
            <ButtonComponent title="Iniciar" onPress={onPress}/>
        </View>
    );
}