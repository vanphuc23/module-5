import axios from "axios";
export const findAll = async () => {
    try {
        let temp = await axios.get("http://localhost:8080/Todo");
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const create = async (value) => {
    try {
         await axios.post("http://localhost:8080/Todo",value)
    } catch (e) {
        console.log(e);
    }
}