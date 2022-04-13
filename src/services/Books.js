import { API, graphqlOperation } from "aws-amplify";
import { getTodo, listTodos } from "../graphql/queries";
import { createTodo, updateTodo, deleteTodo } from "../graphql/mutations";
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

const get = async(bookID) => {
    try {
        const book = await API.graphql(graphqlOperation(getTodo,{id: bookID}))
        console.log(book);
        return book.data.getTodo;
    } catch (error) {
        console.log({ error });
    }
}

const update=async(Todo)=>{
    try {
        const updatedBook = await API.graphql(graphqlOperation(updateTodo,{input: Todo}));
        console.log(updatedBook);
        return updatedBook;
    } catch (error) {
        console.log({error});
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



export {list,create,onCreate,get,update};