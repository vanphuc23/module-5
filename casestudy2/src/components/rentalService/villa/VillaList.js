import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
    deleteAllVilla,
    deleteVilla,
    findByIdVilla,
    listRentalType,
    listVilla,
    updateVilla
} from "../../../service/rentalService/Villa";
import Example from "./Example";
import { Button } from "react-bootstrap";

function VillaList() {
    const [villa, setVilla] = useState([]);
    const [deleteId, setDeleteId] = useState();
    const [show, setShow] = useState(false);
    let stt = 1;
    const list = async () => {
        let temp = await listVilla();
        setVilla(temp);
        console.log(villa)
    }

    useEffect(() => {
        list();
        listType();
    }, []);

    const deleteVillaById = async () => {
        await deleteVilla(deleteId);
        await list();
        toast.success("Delete Success");
    }

    const findId = (id) => {
        setDeleteId(id);
    }

    // Update

    const [rentalType, setRentalType] = useState([]);

    const listType = async () => {
        let temp = await listRentalType();
        setRentalType(temp);
    }

    const validate = {
        serviceName: Yup.string().required("Required").matches(/^[^\d]+$/, "Tên dịch vụ không được chứa số"),
        swimmingPoolArea: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1, "Số nhập vào phải lớn hơn 0"),
        floors: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1, "Số nhập vào phải lớn hơn 0"),
        usableArea: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1, "Số nhập vào phải lớn hơn 0"),
        rentalCosts: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1, "Số nhập vào phải lớn hơn 0"),
        people: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1, "Số nhập vào phải lớn hơn 0"),
        roomStandards: Yup.string().required("Required"),
        otherAmenitiesDescribed: Yup.string().required("Required")
    }

    const update = async (value) => {
        await updateVilla(value);
        await list();
    }

    const [villa2, setVilla2] = useState();
    const [showModal,setShowModal] = useState(false);
    const findById = async (id) => {
        let temp = await findByIdVilla(id);
        setVilla2({...temp, rentalType: JSON.stringify(temp.rentalType)});
    }

    useEffect(() => {
        if (villa2) handleShow()
    }, [villa2])

    const closeModal = () => {
        setShowModal(false);
    }
    console.log(villa2);

    // Update

    const handleShow = () => setShow(true);

    const [deleteAll,setDeleteAll] = useState([])

    const clickCheckBox = (e) => {
        let newDeleteId = [...deleteAll, e];
        setDeleteAll(newDeleteId);
    }

    const deleteItem = (item) => {
        const deleteData = deleteAll.filter((data) => data !== item);
        setDeleteAll(deleteData);
    }

    console.log(deleteAll)

    const xoa = async () => {
        deleteAll.map((item) => deleteAllVilla(item))
        await list();
    }

    if (!villa) return null;
    if (!rentalType) return null;

    return (
        <>
             <button onClick={xoa} className="btn btn-outline-danger">Xóa</button>
        {villa2 && <Example show={show} setShow={setShow} data={villa2} showList={list} />}
            <h1 style={{textAlign: 'center'}}>Danh sách Villa</h1>
            <div className="container">
                <NavLink to="/villa/create" className="btn btn-outline-primary">Thêm mới</NavLink>
            </div>
            <table className="table container">
                <thead>
                <tr>
                    <td>STT</td>
                    <td>Tên dịch vụ</td>
                    <td>Diện tích sử dụng</td>
                    <td>Kiểu thuê</td>
                    <td>Số lượng người tối đa</td>
                    <td>Tiêu chuẩn phòng</td>
                    <td>Mô tả tiện nghi khác</td>
                    <td>Diện tích hồ bơi</td>
                    <td>Số tầng</td>
                    <td>Chi phí thuê</td>
                </tr>
                </thead>
                <tbody>
                {villa.map((item, index) => (
                    <tr key={index}>
                        <td>{stt++}</td>
                        <td>{item.serviceName}</td>
                        <td>{item.usableArea}</td>
                        <td>{item.rentalType.type}</td>
                        <td>{item.people}</td>
                        <td>{item.roomStandards}</td>
                        <td>{item.otherAmenitiesDescribed}</td>
                        <td>{item.swimmingPoolArea}</td>
                        <td>{item.floors}</td>
                        <td>{item.rentalCosts}</td>
                        <td>
                            <NavLink to={`/villa/edit/${item.id}`}
                                     className='btn btn-outline-warning'>Edit</NavLink>
                            <button type="button" style={{marginLeft:'10px'}} className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            onClick={() => findId(item.id)}
                            >
                                Delete
                            </button>

                            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" onClick={() => findById(item.id)}>
                                Update
                            </button> */}
                            <Button variant="primary" onClick={() => findById(item.id)}>
                                Update
                            </Button>
                        </td>
                        <td>
                            <input type="checkbox" value={item.id} onClick={(e)=> {
                                if(e.target.checked) {
                                    clickCheckBox(e.target.value);
                                } else {
                                    deleteItem(e.target.value);
                                }
                            }}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {deleteId}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" data-bs-dismiss="modal" onClick={() => deleteVillaById()} class="btn btn-outline-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VillaList;