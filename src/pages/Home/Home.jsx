import React, { useState, useEffect, useContext } from "react";
import { Text, View, TextInput, Picker } from 'react-native';
import { styles } from "./Home.styles";
import ButtonComponent from "../../components/Button";

import { create, onCreate } from "../../services/Books";

import { GlobalContext } from "../../context/global/global.context";

export default function HomeScreen() {
    const [book, setBook] = useState({ name: "", description: "", estatus: "", ISBN: "", cat: "", published: "" });
    const { listBooks } = useContext(GlobalContext);
    const [selectedValue, setSelectedValue] = useState("DISPONIBLE");

    async function createBook(name, description, estatus, ISBN, cat, published) {
        const bookCreated = await create({ name, description, estatus, ISBN, cat, published })
        return bookCreated;
    }

    const addData = () => {
        createBook(book.name, book.description, book.estatus, book.ISBN, book.cat, book.published)
    }

    useEffect(() => {
        let subscription;
        (async function suscribe() {
            subscription = await onCreate(listBooks)
        })();
        return () => {
            subscription?.unsubscribe()
        }
    }, [])


    return (
        <View style={styles.container}>
            <Text>Nombre</Text>
            <TextInput
                onChangeText={(text) =>
                    setBook((current) => ({ ...current, name: text }))
                }
                style={styles.input}
            />
            <Text>Descripción</Text>
            <TextInput
                onChangeText={(text) =>
                    setBook((current) => ({ ...current, description: text }))
                }
                style={styles.input}
            />
            <Text>Estatus</Text>
            <Picker
                onValueChange={(itemValue, itemIndex) =>
                    setBook((current) => ({ ...current, estatus: itemValue }))
                }
                style={styles.input}

            >
                <Picker.Item label="DISPONIBLE" value="DISPONIBLE" />
                <Picker.Item label="RENTADO" value="RENTADO" />
            </Picker>
            <Text>ISBN</Text>
            <TextInput
                onChangeText={(text) =>
                    setBook((current) => ({ ...current, ISBN: text }))
                }
                style={styles.input}
            />
            <Text>Categoría</Text>
            <TextInput
                onChangeText={(text) =>
                    setBook((current) => ({ ...current, cat: text }))
                }
                style={styles.input}
            />

            <Text>Fecha de Publicación</Text>
            <TextInput
                onChangeText={(text) =>
                    setBook((current) => ({ ...current, published: text }))
                }
                style={styles.input}
            />
            <ButtonComponent title="ALTA" onPress={addData} />
        </View>
    );
}