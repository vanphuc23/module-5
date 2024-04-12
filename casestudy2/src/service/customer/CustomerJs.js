import axios from "axios";

export const getAllCustomer = async () => {
    try {
        let temp = await axios.get("http://localhost:8080/customer");
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const getAllTypeCustomer = async () => {
    try {
        let temp = await axios.get("http://localhost:8080/typeCustomer");
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}