import React, { useState, useEffect, useContext } from "react";
import { Text, View, ScrollView } from 'react-native';
import { styles } from "./Catalogo.styles";
import ButtonComponent from "../../components/Button";
import { GlobalContext } from "../../context/global/global.context";
import { update,deleted} from "../../services/Books";
export default function CatalogoScreen() {
    const { listBooks, books } = useContext(GlobalContext);
    const { getBook, book} = useContext(GlobalContext);

    
    useEffect(() => {
        listBooks();
       //getBook("76c6fa24-20e2-4172-93c0-3bd9deaa2228");
    }, [book])

    function getTodo (id) {

        getBook(id);
    }

    const deleteData= (book)=> {
        
        deleteTodo(book.id, book.name, book.description, book.estatus, book.ISBN, book.cat, book.published);
        getTodo(book.id);
    }
    
    const updateData = (book) => {
        updateBook(book.id, book.name, book.description, book.estatus, book.ISBN, book.cat, book.published);
        getTodo(book.id);
    }
    async function deleteTodo(id,name, description, estatus, ISBN, cat, published){
        console.log("SE EJECUTA LA FUNCION DE ELIMINAR");
        const deletedBook = await deleted({id})
        return deletedBook;
    }

    async function updateBook(id,name, description, estatus, ISBN, cat, published) {
        console.log("SE EJECUTA LA FUNCION DE ACTUALIZAR");

        const bookCreated = await update({id,name, description, estatus, ISBN, cat, published })
        return bookCreated;
    }


    
    return (
        <ScrollView>
            <View style={styles.container}>
                {books && books.map((book) =>
                    
                    <>                   
                    <Text>Nombre: {`${book.name}`}</Text><Text>Descripción: {`${book.description} `}</Text><Text>Estatus: {`${book.estatus} `}</Text><Text>ISBN: {`${book.ISBN}`}</Text><Text>Categoría: {`${book.cat}`}</Text><Text style={{ marginBottom: 20 }}>Fecha de Publicación: {`${book.published}`}</Text>
                    <ButtonComponent title={`${book.estatus} `} onPress={() => updateData(book)}/>
                    <ButtonComponent title="Eliminar" color="#EA4B4B" onPress={() =>deleteData(book)}/>
                    </>
                    
                )}
                
            </View>
        </ScrollView>

    );
}