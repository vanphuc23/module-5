import {useEffect, useState} from "react";
import {getAll, getAllType} from "../service/ProductService";
import Moment from 'moment';
import {ErrorMessage, Field} from "formik";
import {NavLink} from "react-router-dom";
import CurrencyFormat from "./CurrencyFormat";

function List() {
    const [product, setProduct] = useState([]);
    const [type, setType] = useState([]);
    let stt = 1;
    const [name, setName] = useState("");
    const [type2,setType2] = useState("");

    const getAllProduct = async () => {
        let temp = await getAll(name,type2);
        setProduct(temp);
    }

    const getAllTypeProduct = async () => {
        let temp = await getAllType();
        setType(temp);
    }

    useEffect(() => {
        getAllProduct();
    }, [name,type2]);

    useEffect(() => {
        getAllTypeProduct();
    }, []);

    const handleSearch = (e) => {
        setType2(e.target.value);
    }


    if (!product) return null;
    if (!type) return null;

    return (
        <>
            <h1 style={{textAlign: 'center'}}>Thông tin sản phầm</h1>
            <div style={{display: 'flex'}} className='container'>
                <div className="mb-3" style={{marginRight:'10px'}}>
                    <input type="text" name="name" className="form-control" id="name"
                           onChange={(e)=> setName(e.target.value)}
                           placeholder="Nhập tên sản phẩm"
                    />
                </div>
                <div className="mb-3">
                    <select className="form-select"
                           aria-label="Default select example"
                            onChange={handleSearch}>
                        <option value="">--Chọn thể loại--</option>
                        {type.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <NavLink to={'/product/create'} className="btn btn-primary container"
                             style={{marginLeft:'800px',width:'110px'}}>Thêm mới</NavLink>
                </div>
            </div>
            {
                (product.length !== 0) ?
            <table className='table container'>
                <thead>
                <tr>
                    <td>STT</td>
                    <td>Mã sản phẩm</td>
                    <td>Tên sản Phẩm</td>
                    <td>Thể loại</td>
                    <td>Số lượng</td>
                    <td>Giá</td>
                    <td>Ngày nhập sản phẩm</td>
                </tr>
                </thead>
                <tbody>
                {product.map((item, index) => (
                    <tr key={index}>
                        <td>{stt++}</td>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.type.name}</td>
                        <td>{item.number}</td>
                        <td><CurrencyFormat value={item.price}/></td>
                        <td>{Moment(item.date).format("DD/MM/yyyy")}</td>
                    </tr>
                ))}
                </tbody>
            </table> : <h3 className='container'>Không có kết quả</h3>
            }
        </>
    )
}

export default List;