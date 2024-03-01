import './ContactFormCss.css';
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";

export function ContactForm() {
    const initValue = {
        name: "",
        email: "",
        phone: "",
        message: ""
    }
    const validate = {
        name: Yup.string().required("Required"),
        phone: Yup.string().required("Required"),
        email: Yup.string().matches(/([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/, "Wrong Format")
    }
    function handleChange(evt) {

    }
    return (
        <>
            <div>
                <h1>Contract form</h1>
                <Formik initialValues={initValue} onSubmit={(values, {setSubmitting}) => {
                    console.log(values);
                    toast("Add contact successfully!!!");
                    setTimeout(() => {
                        setSubmitting(false)
                    }, 5000);
                }}
                        validationSchema={Yup.object(validate)}
                >
                    {
                        ({isSubmitting}) => (
                            <Form>
                                <div>
                                    <label htmlFor='name'>Name</label>
                                    <Field type='text' id='name' name='name'/>
                                    <ErrorMessage name='name' component='span' style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div>
                                    <label htmlFor='email'>Email</label>
                                    <Field type='text' id='email' name='email'/>
                                    <ErrorMessage name='email' component='span' style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div>
                                    <label htmlFor='phone'>Phone</label>
                                    <Field type='text' id='phone' name='phone'/>
                                    <ErrorMessage name='phone' component='span' style={{color: 'red'}}></ErrorMessage>
                                </div>
                                <div>
                                    <label htmlFor='message'>Name</label>
                                    <textarea name="message" id="message" cols="30" rows="10"></textarea>
                                </div>
                                {isSubmitting?<></>:<button type='submit'>Submit</button>}
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </>
    )
}