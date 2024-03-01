import {useEffect, useState} from "react";
import {list, listProductName} from "../service/Donhang";
import Moment from 'moment';
import {NavLink} from "react-router-dom";
import axios from "axios";

function List() {
    const [donhang, setDonhang] = useState([]);
    const [productList, setProductList] = useState([]);
    const [search, setSearch] = useState("");
    let stt = 1;
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");


    useEffect(() => {
        ListProducts();
    }, [])

    const ListProducts = async () => {
        let temp = await listProductName();
        setProductList(temp);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleSearchDate = async () => {
        try {
            let temp = await axios.get(`http://localhost:8080/donhang?products.name_like=${search}&_sort=products.price`);
            let date = temp.data;
            const filterDate = date.filter((item) => {
                return item.buyDate >= fromDate && item.buyDate <= toDate;
            })
            setDonhang(filterDate);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (fromDate == "" || toDate == "") {
            ListDonhang();
        } else {
            handleSearchDate();
        }
    }, [fromDate, toDate, search]);
    const ListDonhang = async () => {
        let temp = await list(search);
        setDonhang(temp);
    }

    if (donhang.length === 0) {
        return (
            <>
                <h1 style={{textAlign: "center"}}>
                    Danh sách đơn hàng
                </h1>
                <NavLink to={'/donhang/create'} className="btn btn-primary container"
                         style={{width: '200px', marginLeft: '90px'}}>Create new donhang</NavLink>

                <div style={{display: 'flex'}}>
                    <div className="mb-3">
                        <label htmlFor="productTypes" className="form-label" style={{marginLeft: '90px'}}>Loại sản
                            phẩm:</label>
                        <select className="form-select" id="productTypes"
                                aria-label="Default select example" style={{width: '220px', marginLeft: '90px'}}
                                onChange={handleSearch}>
                            <option value="">--Chọn loại sản phẩm--</option>
                            {productList.map((item, index) => (
                                <option key={index} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{display: 'flex', margin: '0 calc(50% - 10px)'}}>
                        <div className="mb-3" style={{marginRight: '10px'}}>
                            <label htmlFor="fromDate" className="form-label">Ngày bắt đầu:</label>
                            <input type="date" className="form-control" id="fromDate"
                                   onChange={(e) => setFromDate(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fromDate" className="form-label">Ngày kết thúc:</label>
                            <input type="date" className="form-control" id="fromDate"
                                   onChange={(e) => setToDate(e.target.value)}/>
                        </div>
                    </div>
                </div>

                <table className='table container'>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn hàng</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá(USD)</th>
                        <th>Loại sản phẩm</th>
                        <th>Ngày mua</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền(USD)</th>
                        <th>Actior</th>
                    </tr>
                    </thead>
                </table>
                <h3 className='container'>Không có kết quả</h3>
            </>
        )
    }

    if (!productList) return null;

    return (
        <>
            <h1 style={{textAlign: "center"}}>
                Danh sách đơn hàng
            </h1>
            <NavLink to={'/donhang/create'} className="btn btn-primary container"
                     style={{width: '200px', marginLeft: '90px'}}>Create new donhang</NavLink>

            <div style={{display: 'flex'}}>
                <div className="mb-3">
                    <label htmlFor="productTypes" className="form-label" style={{marginLeft: '90px'}}>Loại sản
                        phẩm:</label>
                    <select className="form-select" id="productTypes"
                            aria-label="Default select example" style={{width: '220px', marginLeft: '90px'}}
                            onChange={handleSearch}>
                        <option value="">--Chọn loại sản phẩm--</option>
                        {productList.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div style={{display: 'flex', margin: '0 calc(50% - 10px)'}}>
                    <div className="mb-3" style={{marginRight: '10px'}}>
                        <label htmlFor="fromDate" className="form-label">Ngày bắt đầu:</label>
                        <input type="date" className="form-control" id="fromDate"
                               onChange={(e) => setFromDate(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fromDate" className="form-label">Ngày kết thúc:</label>
                        <input type="date" className="form-control" id="fromDate"
                               onChange={(e) => setToDate(e.target.value)}/>
                    </div>
                </div>
            </div>
            <table className='table container'>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã đơn hàng</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá(USD)</th>
                    <th>Loại sản phẩm</th>
                    <th>Ngày mua</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền(USD)</th>
                    <th>Actior</th>
                </tr>
                </thead>
                <tbody>
                {donhang.map((item, index) => (
                    <tr key={index}>
                        <td>{stt++}</td>
                        <td>{item.id}</td>
                        <td>{item.products.name}</td>
                        <td>{item.products.price}</td>
                        <td>{item.products.type}</td>
                        <td>{Moment(item.buyDate).format("DD/MM/yyyy")}</td>
                        <td>{item.number}</td>
                        <td>{item.total}</td>
                        <td>
                            <button></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default List;