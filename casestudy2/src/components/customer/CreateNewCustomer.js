import {useEffect, useState} from "react";
import {getAllTypeCustomer} from "../../service/customer/CustomerJs";

function CreateNewCustomer() {
    const[typeCustomers,setTypeustomers] = useState([]);
    const customer = {
        name: "",
        date: "",
        gender: "",
        cmnd: "",
        phone: "",
        email: "",
        address: ""
    }

    const listTypeCustomer = async () => {
        let temp = await getAllTypeCustomer();
        setTypeustomers(temp);
    }

    useEffect(() => {

    }, []);
}