import React, {useState, useEffect, useContext} from "react";
import { Text, View } from 'react-native';
import { styles } from "./Catalogo.styles";
import {list} from "../../services/Books";

import { GlobalContext } from "../../context/global/global.context";

export default function CatalogoScreen() {
    const {listBooks, books} = useContext(GlobalContext);

    useEffect(() => {
        listBooks();
    },[])
    
    return (
        <View style={styles.container}>
            {books && books.map((book)=> 
            <><Text>Name: {`${book.name}`}</Text><Text>Description: {`${book.description} `}</Text><Text>Estatus: {`${book.estatus} `}</Text><Text>ISBN: {`${book.ISBN}`}</Text><Text>Categoria: {`${book.cat}`}</Text><Text style={{marginBottom: 20}}>Fecha de Publicacion: {`${book.published}`}</Text></>            
            )}
        </View>
    );
}