import axios from "axios";

export const list = async () => {
    try {
        let temp = await axios.get("http://localhost:8080/Service");
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const add = async (value) => {
    try {
        await axios.post("http://localhost:8080/Service",value);
    } catch (e) {
        console.log(e);
    }
}

export const listRentalType = async () => {
    try {
        let temp = await axios.get("http://localhost:8080/rentalType");
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const deleteVilla = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/Service/${id}`);
    } catch (e) {
        console.log(e);
    }
}

export const findById = async (id) => {
    try {
        let temp = await axios.get(`http://localhost:8080/Service/${id}`);
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const updateById = async (value) => {
    try {
        await axios.patch(`http://localhost:8080/Service/${value.id}`,value);
    } catch (e) {
        console.log(e);
    }
}

export const listFreeServices = async () => {
    try {
        let temp = await axios.get("http://localhost:8080/freeService");
        return temp.data
    } catch (e) {
        console.log(e);
    }
}

export const fetchAll = async (page,limit,search) => {
    try {
        let temp = await axios.get(`http://localhost:8080/Service?_page=${page}&_limit=${limit}&serviceName_like=${search}`);
        return temp.data;
    }catch (e) {
        console.log(e);
    }
}