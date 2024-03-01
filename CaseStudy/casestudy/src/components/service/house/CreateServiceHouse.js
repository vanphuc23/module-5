import {useNavigate} from "react-router-dom";
import {add, listRentalType} from "../../../services/Service";
import {toast} from "react-toastify";
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";

function CreateServiceHouse() {
    const navigate = useNavigate();
    const [rentalType, setRentalType] = useState([]);
    const house = {
        serviceType: {
            id: 2,
            service: "House"
        },
        serviceName: "",
        area: 0,
        rentalCosts: 0,
        peopleMax: 0,
        rentalType: {},
        roomStandards: "",
        otherAmenities: "",
        numberOfFloors: 0,
    }

    useEffect(() => {
        listRentalTypes();
    }, []);
    const listRentalTypes = async () => {
        let temp = await listRentalType();
        setRentalType(temp);
    }
    const addHouse = async (value) => {
        await add(value);
        toast.success("Create Success");
        navigate("/services/list");
    }
    return(
        <>
            <Formik initialValues={house} onSubmit={(value,{setSubmitting,resetForm}) => {
                console.log(value)
                setTimeout(()=> {
                    setSubmitting(false);
                },2000)
                let obj = {...value,rentalType:JSON.parse(value.rentalType)}
                addHouse(obj);
                resetForm(house)
            }}>
                {
                    ({isSubmitting}) => (
                        <Form className='container'>
                            <div className="mb-3">
                                <label htmlFor="serviceName" className="form-label">Tên dịch vụ:</label>
                                <Field type="text" name="serviceName" className="form-control" id="serviceName"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="area" className="form-label">Diện tích sử dụng:</label>
                                <Field type="number" name="area" className="form-control" id="area"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rentalCosts" className="form-label">Chi phí thuê:</label>
                                <Field type="number" name="rentalCosts" className="form-control" id="rentalCosts"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="peopleMax" className="form-label">Số lượng người tối đa:</label>
                                <Field type="number" name="peopleMax" className="form-control" id="peopleMax"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rentalType" className="form-label">Kiểu thuê:</label>
                                <Field as="select" className="form-select" id="rentalType"
                                       aria-label="Default select example"
                                       name="rentalType" required>
                                    <option value="">Open this select menu</option>
                                    {rentalType.map((item,index)=>(
                                        <option key={index} value={JSON.stringify(item)}>{item.type}</option>
                                    ))}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roomStandards" className="form-label">Tiêu chuẩn phòng:</label>
                                <Field type="text" name="roomStandards" className="form-control" id="roomStandards"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="otherAmenities" className="form-label">Mô tả tiện nghi khác:</label>
                                <Field type="text" name="otherAmenities" className="form-control" id="otherAmenities"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="numberOfFloors" className="form-label">Số tầng:</label>
                                <Field type="number" name="numberOfFloors" className="form-control" id="numberOfFloors"
                                />
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

export default CreateServiceHouse;