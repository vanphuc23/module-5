import {useEffect, useState} from "react";
import * as ListService from "../service/ListService";
import {Create} from "./Create";

function List() {
    const [todo, setTodo] = useState([]);
    const [resert, setResert] = useState(false);
    useEffect(() => {
        getAllTodoist();
        setResert(false);
    }, [resert]);
    const getAllTodoist = async () => {
        try {
            let temp = await ListService.findAll();
            setTodo(temp);
            console.log(temp);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <h1>Todo List</h1>
            <Create resert={setResert}></Create>
            <ul>
                {todo.map((item,index)=> (
                    <li key={index}>
                        {item.title}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default List;
