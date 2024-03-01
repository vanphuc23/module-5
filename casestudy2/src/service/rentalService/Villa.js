import axios from "axios";

export const listVilla = async () => {
    try {
        let temp = await axios.get('http://localhost:8080/villa');
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const listRentalType = async () => {
    try {
        let temp = await axios.get('http://localhost:8080/rentalType');
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const addNewVilla = async (value) => {
    try {
         await axios.post('http://localhost:8080/villa',value);
    } catch (e) {
        console.log(e);
    }
}

export const findByIdVilla = async (id) => {
    try {
        let temp = await axios.get(`http://localhost:8080/villa/${id}`);
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const updateVilla = async (value) => {
    try {
         await axios.patch(`http://localhost:8080/villa/${value.id}`,value);
    } catch (e) {
        console.log(e);
    }
}

export const deleteVilla = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/villa/${id}`);
    } catch (e) {
        console.log(e);
    }
}