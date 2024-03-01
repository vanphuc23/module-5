import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";

function Medical() {
    const medical = {
        name: "",
        cmnd: "",
        year: "",
        gender: '0',
        province: "",
        district: "",
        email: "",
        text: "",
        sick: []
    }

    const validate = {
        name: Yup.string().required("Required"),
        cmnd: Yup.string().required("Required").matches(/^[0-9]+$/, "CMND chỉ cho phép nhập số"),
        year: Yup.string().required("Required").matches(/^19[0-9]{2}|2[0-9]{3}$/, ">=1900"),
        province: Yup.string().required("Required"),
        district: Yup.string().required("Required"),
        email: Yup.string().required("Required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/, "Invalid email address")
    }

    return (
        <>
            <h1>Tờ khai y tế</h1>
            <Formik initialValues={medical} onSubmit={(values, {setSubmitting}) => {
                console.log(values);
                toast("Khai báo thành công!")
                setTimeout(() => {
                    setSubmitting(false);
                }, 5000)
            }}
                    validationSchema={Yup.object(validate)}
            >
                {
                    ({isSubmitting}) => (
                        <Form className='container'>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Họ tên</label>
                                <Field type="text" className="form-control" id="name" name='name'/>
                                <ErrorMessage name="name" component="span" style={{color: 'red'}}></ErrorMessage>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="cmnd" className="form-label">CMND</label>
                                <Field type="text" className="form-control" id="cmnd" name='cmnd'/>
                                <ErrorMessage name="cmnd" component="span" style={{color: 'red'}}></ErrorMessage>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="year" className="form-label">Năm sinh</label>
                                <Field type="text" className="form-control" id="year" name='year'/>
                                <ErrorMessage name="year" component="span" style={{color: 'red'}}></ErrorMessage>
                            </div>

                            <label className="form-label">Giới tính</label>
                            <div className='mb-3'>
                                <div className="form-check form-check-inline">
                                    <Field className="form-check-input" type="radio" name="gender" id="inlineRadio1"
                                           value="1"/>
                                    <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <Field className="form-check-input" type="radio" name="gender" id="inlineRadio2"
                                           value="0"/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">FeMale</label>
                                </div>
                            </div>

                            <h4>Địa chỉ liên lạc tại Việt Nam</h4>

                            <div className="mb-3">
                                <label htmlFor="province" className="form-label">Tỉnh thành</label>
                                <Field type="text" className="form-control" id="province" name='province'/>
                                <ErrorMessage name="province" component="span" style={{color: 'red'}}></ErrorMessage>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="district" className="form-label">Quận/huyện</label>
                                <Field type="text" className="form-control" id="district" name='district'/>
                                <ErrorMessage name="district" component="span" style={{color: 'red'}}></ErrorMessage>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <Field type="text" className="form-control" id="email" name='email'/>
                                <ErrorMessage name="email" component="span" style={{color: 'red'}}></ErrorMessage>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label"
                                       style={{fontWeight: 'bold'}}>
                                    Trong vòng 14 ngày qua, Anh/chị có đến quốc gia/vùng lãnh thổ nào
                                    (Có thể đi qua nhiều quốc gia)
                                </label>
                                <Field as="textarea"
                                       className="form-control"
                                       id="exampleFormControlTextarea1"
                                       rows={3}
                                       name="text"
                                       defaultValue={""}
                                />
                            </div>

                            <label className="form-label" style={{fontWeight: 'bold'}}>
                                Trong vòng 14 ngày qua, Anh/chị có thấy xuất hiện dấu hiệu nào sau đây
                            </label>
                            <div className="form-check">
                                <Field className="form-check-input" type="checkbox" value="Sốt" id="flexCheckDefault"
                                       name='sick'/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Sốt
                                </label>
                            </div>
                            <div className="form-check">
                                <Field className="form-check-input" type="checkbox" value="Ho" id="flexCheckChecked"
                                       name='sick'/>
                                <label class="form-check-label" for="flexCheckChecked">
                                    Ho
                                </label>
                            </div>
                            {
                                isSubmitting ? <></> : <button type="submit" className="btn btn-primary">Submit</button>
                            }
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

export default Medical;