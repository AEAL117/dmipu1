import { API, graphqlOperation } from "aws-amplify";
import { getBook, listTodos } from "../graphql/queries";
import { createTodo, updateBook, deleteBook } from "../graphql/mutations";
import { onCreateTodo } from "../graphql/subscriptions";

const list = async() => {
    try{
        const Books = await API.graphql(graphqlOperation(listTodos));
        console.log(Books);
        return Books.data.listTodos.items;
    }catch(error){
        console.log({ error });
    }
}

const create = async(Todo)=>{
    try {
        const newBook = await API.graphql(graphqlOperation(createTodo,{input: Todo}));
        console.log(newBook);
        return newBook;
    } catch (error) {
        console.log({error})
    }
}

const onCreate = async(subscriptionFunction) => {
    const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
        next:(BookData) => {
            subscriptionFunction();
        },
    });
    return subscription;
}



export {list,create,onCreate};