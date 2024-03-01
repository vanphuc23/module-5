import {useEffect, useState} from "react";
import {listCustomer} from "../../services/Customer";

function ListCustomer() {
    const [customers, setCustomers] = useState([]);

    const findAll = async () => {
        let temp = await listCustomer();
        setCustomers(temp);
    }

    useEffect(() => {
        findAll();
    }, []);

    return (
        <>
            <h1 style={{textAlign: 'center'}}>Danh sách khách hàng</h1>
            <table className="table container">
                <thead>
                <tr>
                    <th>Họ tên</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>CMND</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Loại khách</th>
                    <th>Địa chỉ</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((item, index) => (
                    <tr key={index}>
                        <td>{item.customerName}</td>
                        <td>{item.birthday}</td>
                        <td>{item.gender}</td>
                        <td>{item.cmnd}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.customerType.name}</td>
                        <td>{item.address}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default ListCustomer;