import axios from "axios";

export const listCustomer = async () => {
    try {
        let temp = await axios.get('http://localhost:8080/Customer');
        return temp.data;
    }catch (e) {
        console.log(e);
    }
}