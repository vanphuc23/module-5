import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {createNew, getAllType} from "../service/ProductService";
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";

function Create() {
    const navigate = useNavigate();
    const [type, setType] = useState([]);
    const product = {
        code: "",
        name: "",
        price: "",
        number: "",
        date: "",
        description: "",
        type: {}
    }

    const getAll = async () => {
        let temp = await getAllType();
        setType(temp);
    }

    useEffect(() => {
        getAll();
    }, []);

    const validate = {
        code: Yup.string().required("Required").matches(/^PROD-\d{4}$/, "Sai định dạng định dạng đúng PROD-XXXX"),
        name: Yup.string().required("Required"),
        price: Yup.number().required("Required"),
        number: Yup.number().required("Required").positive("Số lượng sản phẩm phải là số nguyên lớn hơn 0").integer("Số lượng sản phẩm phải là số nguyên lớn hơn 0").min(1, "Số lượng sản phẩm phải là số nguyên lớn hơn 0"),
        date: Yup.date().required("Required").max(new Date(), "Ngày nhập sản phẩm không được lớn hơn ngày hiện tại"),
        description: Yup.string().required("Required")
    }

    const createNewProduct = async (value) => {
        await createNew(value);
        toast.success("Create Success");
        navigate("/product/list");
    }

    if (!type) return null;

    return (
        <>
            <div className='container'>
                <h1 style={{textAlign: 'center'}}>Thêm mới sản phẩm</h1>
                <Formik initialValues={product} onSubmit={(value, {setSubmitting}) => {
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 1000)
                    let data = {...value,type: JSON.parse(value.type)};
                    createNewProduct(data);
                }} validationSchema={Yup.object(validate)}>
                    {
                        ({isSubmitting}) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="code" className="form-label">Mã sản phẩm:</label>
                                    <Field type="text" name="code" className="form-control" id="code"/>
                                    <ErrorMessage name='code' component='span' style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Tên sản phẩm:</label>
                                    <Field type="text" name="name" className="form-control" id="name"/>
                                    <ErrorMessage name='name' component='span' style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="type" className="form-label">Thể loại:</label>
                                    <Field as="select" className="form-select" id="type"
                                           aria-label="Default select example"
                                           name="type" required>
                                        <option value="">--Chọn thể loại--</option>
                                        {type.map((item, index) => (
                                            <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Giá:</label>
                                    <Field type="number" name="price" className="form-control" id="price"/>
                                    <ErrorMessage name='price' component='span' style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="number" className="form-label">Số lượng:</label>
                                    <Field type="number" name="number" className="form-control" id="number"/>
                                    <ErrorMessage name='number' component='span' style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Ngày nhập sản phẩm:</label>
                                    <Field type="date" name="date" className="form-control" id="date"/>
                                    <ErrorMessage name='date' component='span' style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Mô tả sản phẩm:</label>
                                    <Field as="textarea" name="description" className="form-control" id="description"
                                           style={{height: '100px'}}/>
                                    <ErrorMessage name='description' component='span'
                                                  style={{color: 'red'}}></ErrorMessage>
                                </div>
                                {
                                    isSubmitting ? <></> :
                                        <button type='submit' className='btn btn-primary'>Submit</button>
                                }
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </>
    )
}

export default Create;