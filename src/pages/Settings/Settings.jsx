import React, { useContext } from "react";
import { Text, View } from 'react-native';
import { styles } from "./Settings.styles";

import ButtonComponent from "../../components/Button";

import { GlobalContext } from "../../context/global/global.context";

export default function SettingsScreen({onPress}){
    const {usuario} = useContext(GlobalContext);
    return(
        <View style={styles.container}>
            <Text>Nombre de ususario: {usuario}</Text>      
            <ButtonComponent title="Cerrar sesión" onPress={onPress} color="#ff3f4f"/>
        </View>
    )
}