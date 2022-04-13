import React, { useState, useEffect, useContext } from "react";
import { Text, View, ScrollView } from 'react-native';
import { styles } from "./Catalogo.styles";
import ButtonComponent from "../../components/Button";
import { GlobalContext } from "../../context/global/global.context";

export default function CatalogoScreen() {
    const { listBooks, books } = useContext(GlobalContext);
    const { getBook, book} = useContext(GlobalContext);
    
    useEffect(() => {
        listBooks();
       //getBook("76c6fa24-20e2-4172-93c0-3bd9deaa2228");
    }, [])

    function getTodo (id) {

        getBook(id);
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                {books && books.map((book) =>
                    
                    <> 
                   
                    <Text>Nombre: {`${book.name}`}</Text><Text>Descripción: {`${book.description} `}</Text><Text>Estatus: {`${book.estatus} `}</Text><Text>ISBN: {`${book.ISBN}`}</Text><Text>Categoría: {`${book.cat}`}</Text><Text style={{ marginBottom: 20 }}>Fecha de Publicación: {`${book.published}`}</Text>
                    <ButtonComponent title={`${book.estatus} `}/>
                    <ButtonComponent title="Eliminar" color="#EA4B4B" onPress={() =>getTodo(book.id)}/>
                    
                    </>
                    
                )}
                
            </View>
        </ScrollView>

    );
}