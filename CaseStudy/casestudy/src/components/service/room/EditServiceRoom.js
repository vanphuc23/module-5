import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {findById, listFreeServices, listRentalType, updateById} from "../../../services/Service";
import {Field, Form, Formik} from "formik";
import {toast} from "react-toastify";

function EditServiceRoom() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [rentalType, setRentalType] = useState([]);
    const [freeServices, setFreeServices] = useState([]);
    const [editRoom, setEditRoom] = useState();

    useEffect(() => {
        listRentalTypes();
        listFreeService();
        findId();
    }, []);

    const listRentalTypes = async () => {
        let temp = await listRentalType();
        setRentalType(temp);
    }

    const listFreeService = async () => {
        let temp = await listFreeServices();
        setFreeServices(temp);
    }

    const findId = async () => {
        let temp = await findById(id);
        setEditRoom({
            ...temp, rentalType: JSON.stringify(temp.rentalType),
            freeService: JSON.stringify(temp.freeService)
        })
    }

    const update = async (value) => {
        await updateById(value);
        toast.success("Update Success");
        navigate("/services/list");
    }

    if (!editRoom) return null;

    return (
        <>
            <Formik initialValues={editRoom} onSubmit={(value,{setSubmitting,resetForm})=> {
                setTimeout(() => {
                    setSubmitting(false);
                },3000);
                let obj = {...value, rentalType: JSON.parse(value.rentalType),
                    freeService: JSON.parse(value.freeService)}
                update(obj);
            }}>
                {
                    ({isSubmitting}) =>(
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
                                    {rentalType.map((item, index) => (
                                        <option key={index} value={JSON.stringify(item)}>{item.type}</option>
                                    ))}
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rentalType" className="form-label">Dịch vụ miễn phí đi kèm:</label>
                                <Field as="select" className="form-select" id="freeService"
                                       aria-label="Default select example"
                                       name="freeService" required>
                                    <option value="">Open this select menu</option>
                                    {freeServices.map((item, index) => (
                                        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                                    ))}
                                </Field>
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

export default EditServiceRoom;