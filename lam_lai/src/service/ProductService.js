import axios from "axios";

export const getAll = async (name,typeName) => {
    try {
        let temp = await axios.get(`http://localhost:8080/products?_sort=name&name_like=${name}&type.name_like=${typeName}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const getAllType = async () => {
    try {
        let temp = await axios.get('http://localhost:8080/type')
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const createNew = async (value) => {
    try {
        await axios.post('http://localhost:8080/products',value);
    } catch (e) {
        console.log(e);
    }
}