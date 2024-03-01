import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {findById, listRentalType, updateById} from "../../../services/Service";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import * as Yup from "yup";

function EditServiceVilla() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [rentalType, setRentalType] = useState([]);
    const [editVilla, setEditVilla] = useState();

    useEffect(() => {
        findId();

    }, []);
    console.log(editVilla)
    const findId = async () => {
        let temp = await findById(id);
        setEditVilla({...temp, rentalType: JSON.stringify(temp.rentalType)});
    }

    const listRentalTypes = async () => {
        const temp = await listRentalType();
        setRentalType(temp);
    }

    useEffect(() => {
        listRentalTypes();
    }, []);

    const update = async (value) => {
        await updateById(value);
        toast.success("Update Success");
        navigate("/services/list");
    }

    const validate = {
        serviceName: Yup.string().required("Required").matches(/^(?!.*[0-9]).*/, 'Tên dịch vụ không được chứa số'),
        area: Yup.number().required('Required'),
        peopleMax: Yup.number().required("Required"),
        rentalType: Yup.string().required("Required"),
        roomStandards: Yup.string().required("Required"),
        otherAmenities: Yup.string().required("Required")
    }

    if (!editVilla) return null

    return editVilla.serviceName !== "" ?
        (
            <>
                <Formik initialValues={editVilla} onSubmit={(value, {setSubmitting}) => {
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 1000);
                    const obj = {
                        ...value, rentalType: JSON.parse(value.rentalType)
                    }
                    update(obj)
                }} validationSchema={Yup.object(validate)}>
                    {
                        ({isSubmitting}) => (
                            <Form className="container">
                                <div className="mb-3">
                                    <label htmlFor="serviceName" className="form-label">Tên dịch vụ:</label>
                                    <Field type="text" name="serviceName" className="form-control" id="serviceName"/>
                                    <ErrorMessage name='serviceName' component='span'
                                                  style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="area" className="form-label">Diện tích sử dụng:</label>
                                    <Field type="number" name="area" className="form-control" id="area"/>
                                    <ErrorMessage name='area' component='span' style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rentalCosts" className="form-label">Chi phí thuê:</label>
                                    <Field type="number" name="rentalCosts" className="form-control" id="rentalCosts"/>
                                    <ErrorMessage name='rentalCosts' component='span'
                                                  style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="peopleMax" className="form-label">Số lượng người tối đa:</label>
                                    <Field type="number" name="peopleMax" className="form-control" id="peopleMax"/>
                                    <ErrorMessage name='peopleMax' component='span'
                                                  style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rentalType" className="form-label">Kiểu thuê:</label>
                                    <Field as="select" className="form-select" id="rentalType"
                                           aria-label="Default select example"
                                           name="rentalType">
                                        <option value="">Open this select menu</option>
                                        {rentalType.map((item, index) => (
                                            <option key={index} value={JSON.stringify(item)}>{item.type}</option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="roomStandards" className="form-label">Tiêu chuẩn phòng:</label>
                                    <Field type="text" name="roomStandards" className="form-control"
                                           id="roomStandards"/>
                                    <ErrorMessage name='roomStandards' component='span'
                                                  style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="otherAmenities" className="form-label">Mô tả tiện nghi khác:</label>
                                    <Field type="text" name="otherAmenities" className="form-control"
                                           id="otherAmenities"/>
                                    <ErrorMessage name='otherAmenities' component='span'
                                                  style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="poolArea" className="form-label">Diện tích hồ bơi:</label>
                                    <Field type="number" name="poolArea" className="form-control" id="poolArea"/>
                                    <ErrorMessage name='poolArea' component='span'
                                                  style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="numberOfFloors" className="form-label">Số tầng:</label>
                                    <Field type="number" name="numberOfFloors" className="form-control"
                                           id="numberOfFloors"/>
                                    <ErrorMessage name='numberOfFloors' component='span'
                                                  style={{color: 'red'}}></ErrorMessage>
                                </div>
                                {
                                    isSubmitting ? <></> :
                                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                                }
                            </Form>
                        )
                    }
                </Formik>
            </>
        ) : ""
}

export default EditServiceVilla;