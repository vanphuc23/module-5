import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as LibraryService from "../service/LibraryService";
import {Field, Form, Formik} from "formik";
import {toast} from "react-toastify";

function EditBook() {
    const {id} = useParams();
    const [library, setLibrary] = useState({
        title: "",
        quantity: 0
    })
    const navigate = useNavigate();

    useEffect(() => {
        edit();
    }, []);

    const edit = async () => {
        try {
            let temp = await LibraryService.findById(id);
            setLibrary(temp);
        } catch (e) {
            console.log(e);
        }
    }

    const update = async (value) => {
        await LibraryService.updateById(id,value);
        navigate("/books/list");
        toast.success("Update success");
    }

    return library.title !== "" ?
    (
        <>
            <Formik initialValues={library} onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    setSubmitting(false);
                }, 5000)
                console.log(values);
                update(values);
            }}>
                {
                    ({isSubmitting}) => (
                        <Form className="container">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title:</label>
                                <Field type="text" className="form-control" id="title" name="title"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Quantity:</label>
                                <Field type="number" className="form-control" id="quantity" name="quantity"/>
                            </div>
                            {
                                isSubmitting ? <></> : <button type="submit" className="btn btn-primary">Submit</button>
                            }
                        </Form>
                    )
                }
            </Formik>
        </>
    ) : ""
}

export default EditBook;