import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";

export function DemoForm() {
    const form = {
        email: "",
        pass: ""
    };

    const regex = {
        email: Yup.string().matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "error")
    }

    return (
        <>
            <Formik initialValues={form} onSubmit={(values, {setSubmitting}) => {
                console.log(values);
                toast("Thêm mới thành công");
                setTimeout(() => {
                    setSubmitting(false);
                }, 3000);
            }}
                    validationSchema={Yup.object(regex)}
            >
                {
                    ({isSubmitting}) => (
                        <Form>
                            <div>
                                <label htmlFor='email'>Email</label>
                                <Field type='email' id='email' name='email'/>
                                <ErrorMessage name='email' component='small' style={{color: 'red'}}></ErrorMessage>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <Field type='password' id='password' name='pass'/>
                            </div>
                            {
                                isSubmitting ? <></> :
                                    <button type='submit'>Submit</button>
                            }
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}