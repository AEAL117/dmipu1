import React, {createContext, useState} from "react";
import {list} from "../../services/Books";
import { Auth } from 'aws-amplify';

const initialState={
    user:null,
    colorDefault:"#00a884"
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({children}) => {
    const [state, setState] = useState(initialState);
    const [books, setBooks] = useState();
    const [usuario, setUsuario] = useState(Auth.user.username);

    function login(email, pwd){
        console.log(Auth.user.username);
        setState((current)=> ({ ...current, user: usuario}));
    }

    async function logout(){
        try {
            await Auth.signOut({ global: true });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    async function listBooks(){
        const booksFetched = await list();
        if(booksFetched) setBooks(booksFetched);
    }

    return(
        <GlobalContext.Provider value={{ state, login, logout, listBooks, books, usuario}}>
            {children}
        </GlobalContext.Provider>
    );
};