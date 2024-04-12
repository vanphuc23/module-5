import {useEffect, useState} from "react";
import {getAllCustomer} from "../../service/customer/CustomerJs";

function CustomerList() {
    const [customer, setCustomer] = useState([]);
    let stt = 1;
    const getAll = async () => {
        let temp = await getAllCustomer()
        setCustomer(temp);
    }
    useEffect(() => {
        getAll().then();
    }, []);
    return (
        <>
            <h1 style={{textAlign: "center"}}>Danh sách Khách hàng</h1>
            <table className="table container">
                <thead>
                <tr>
                    <td>STT</td>
                    <td>Name</td>
                    <td>Date</td>
                    <td>Gender</td>
                    <td>Type</td>
                </tr>
                </thead>
                <tbody>
                {customer.map((item,index)=>(
                    <tr key={index}>
                        <td>{stt++}</td>
                        <td>{item.name}</td>
                        <td>{item.date}</td>
                        <td>
                            {item.gender === 0 ? "Nữ" : "Nam"}
                        </td>
                        <td>{item.typeCustomer.type}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default CustomerList;