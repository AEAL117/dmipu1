import React, { useState, useEffect, useContext } from "react";
import { Text, View, ScrollView } from 'react-native';
import { styles } from "./Catalogo.styles";

import { GlobalContext } from "../../context/global/global.context";

export default function CatalogoScreen() {
    const { listBooks, books } = useContext(GlobalContext);

    useEffect(() => {
        listBooks();
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                {books && books.map((book) =>
                    <><Text>Nombre: {`${book.name}`}</Text><Text>Descripción: {`${book.description} `}</Text><Text>Estatus: {`${book.estatus} `}</Text><Text>ISBN: {`${book.ISBN}`}</Text><Text>Categoría: {`${book.cat}`}</Text><Text style={{ marginBottom: 20 }}>Fecha de Publicación: {`${book.published}`}</Text></>
                )}
            </View>
        </ScrollView>

    );
}