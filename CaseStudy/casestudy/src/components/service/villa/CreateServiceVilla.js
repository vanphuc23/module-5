import {add, listRentalType} from "../../../services/Service";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";

function CreateServiceVilla() {
    const navigate = useNavigate();
    const [rentalType, setRentalType] = useState([]);
    const villa = {
        serviceName: "",
        area: 0,
        serviceType: {
            id : 1,
            service : "Villa"
        },
        rentalCosts: 0,
        peopleMax: 0,
        rentalType: {},
        roomStandards: "",
        otherAmenities: "",
        poolArea: 0,
        numberOfFloors: 0
    }



    useEffect(() => {
        listRentalTypes();
    }, []);

    const createVilla = async (value) => {
        try {
            await add(value);
            toast.success("Create Success");
            navigate("/services/list");
        } catch (e) {
            console.log(e)
        }
    }

    const validate = {
        serviceName: Yup.string().required("Required").matches(/^(?!.*[0-9]).*/,'Tên dịch vụ không được chứa số'),
        area: Yup.number().required('Required'),
        peopleMax: Yup.number().required("Required"),
        rentalType: Yup.string().required("Required"),
        roomStandards: Yup.string().required("Required"),
        otherAmenities: Yup.string().required("Required")
    }

    const listRentalTypes = async () => {
        try {
            let temp = await listRentalType();
            setRentalType(temp);
        } catch (e) {
            console.log(e);
        }
    }



    return (
        <>
            <Formik initialValues={villa} onSubmit={async (value, {setSubmitting, resetForm}) => {
                console.log(value);
                setTimeout(() => {
                    setSubmitting(false);
                }, 3000);
                const obj = {
                    ...value, rentalType: JSON.parse(value.rentalType)
                }
                await createVilla(obj);
            }} validationSchema={Yup.object(validate)}>
                {
                    ({isSubmitting}) => (
                        <Form className="container">
                            <div className="mb-3">
                                <label htmlFor="serviceName" className="form-label">Tên dịch vụ:</label>
                                <Field type="text" name="serviceName" className="form-control" id="serviceName"/>
                                <ErrorMessage name='serviceName' component='span' style={{color:'red'}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="area" className="form-label">Diện tích sử dụng:</label>
                                <Field type="number" name="area" className="form-control" id="area"/>
                                <ErrorMessage name='area' component='span' style={{color:'red'}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rentalCosts" className="form-label">Chi phí thuê:</label>
                                <Field type="number" name="rentalCosts" className="form-control" id="rentalCosts"/>
                                <ErrorMessage name='rentalCosts' component='span' style={{color:'red'}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="peopleMax" className="form-label">Số lượng người tối đa:</label>
                                <Field type="number" name="peopleMax" className="form-control" id="peopleMax"/>
                                <ErrorMessage name='peopleMax' component='span' style={{color:'red'}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rentalType" className="form-label">Kiểu thuê:</label>
                                <Field as="select" className="form-select" id="rentalType"
                                       aria-label="Default select example"
                                       name="rentalType" required>
                                    <option value="">Open this select menu</option>
                                    {rentalType.map((item, index) => (
                                        <option key={index} value={JSON.stringify(item)}>{item.type}</option>
                                    ))}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roomStandards" className="form-label">Tiêu chuẩn phòng:</label>
                                <Field type="text" name="roomStandards" className="form-control" id="roomStandards"/>
                                <ErrorMessage name='roomStandards' component='span' style={{color:'red'}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="otherAmenities" className="form-label">Mô tả tiện nghi khác:</label>
                                <Field type="text" name="otherAmenities" className="form-control" id="otherAmenities"/>
                                <ErrorMessage name='otherAmenities' component='span' style={{color:'red'}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="poolArea" className="form-label">Diện tích hồ bơi:</label>
                                <Field type="number" name="poolArea" className="form-control" id="poolArea"/>
                                <ErrorMessage name='poolArea' component='span' style={{color:'red'}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="numberOfFloors" className="form-label">Số tầng:</label>
                                <Field type="number" name="numberOfFloors" className="form-control" id="numberOfFloors"/>
                                <ErrorMessage name='numberOfFloors' component='span' style={{color:'red'}}></ErrorMessage>
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
    )
}

export default CreateServiceVilla;