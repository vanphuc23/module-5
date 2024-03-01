import {useEffect, useState} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import EditLibrary from "./EditLibrary";

function Library() {
    const [libraries, setLibraries] = useState([])
    const library = {
        title: "",
        number: ""
    }
    const navigate = useNavigate();
    const [display, setDisplay] = useState(false)
    const [editValue, setEditValue] = useState();
    const displayEdit = false;
    const validate = {
        title: Yup.string().required("Required"),
        number: Yup.string().required("Required").matches(/^[0-9]+$/, "Số lượng chỉ cho phép nhập số")
    }

    const onEditHandler = (value) => {
        setEditValue(value)
    }

    const renderForm = (value) => {
        return <Formik key={value.title} initialValues={value}
                       onSubmit={(values, {setSubmitting, resetForm}) => {
                           if (value.title) {
                               const arr = [...libraries];
                               arr[value.index].title = values.title;
                               arr[value.index].number = values.number;
                               setLibraries([...arr])
                           } else {
                               setLibraries((prevState) => {
                                   return [
                                       ...prevState,
                                       values
                                   ]
                               })
                           }
                           setSubmitting(false)
                           resetForm(library)
                           setEditValue(library)
                           toast("Thêm mới thành công")
                           setDisplay(true);
                       }}
                       validationSchema={Yup.object(validate)}>
            {
                ({isSubmitting}) => (
                    <Form>
                        <div>
                            <label htmlFor="title">Tiêu đề</label> <br/>
                            <Field type="text" name='title' id='title'/>
                            <ErrorMessage name='title' component='span' style={{color: "red"}}></ErrorMessage>
                        </div>
                        <div>
                            <label htmlFor="number">Số lượng</label> <br/>
                            <Field type="text" name='number' id='number'/>
                            <ErrorMessage name='number' component='span' style={{color: "red"}}></ErrorMessage>
                        </div>
                        <button type='submit'>Submit</button>
                    </Form>
                )}
        </Formik>
    }
    return (
        <>
            <h1>Library</h1>
            {renderForm(editValue ? editValue : library)}
            {display &&
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Number</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {libraries.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.number}</td>
                            <td>
                                <button onClick={() => onEditHandler({...item, index})}>Edit</button>
                            </td>
                            <td>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </>
    )
}

export default Library;