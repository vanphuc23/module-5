import axios from "axios";

export const findAll = async () => {
    try {
        let temp = await axios.get("http://localhost:8080/book");
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const create = async (value) => {
    try {
        await axios.post("http://localhost:8080/book",value);
    }catch (e) {
        console.log(e);
    }
}

export const deleteById = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/book/${id}`);
    } catch (e) {
        console.log(e);
    }
}

export const findById = async (id) => {
    try {
        let temp = await axios.get(`http://localhost:8080/book/${id}`);
        return temp.data;
    }catch (e) {
        console.log(e);
    }
}

export const updateById = async (id,value) => {
    try {
        await axios.patch("http://localhost:8080/book/"+ id,value);
    }catch (e) {
        console.log(e);
    }
}