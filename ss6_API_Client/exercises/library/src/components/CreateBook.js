import {create} from "../service/LibraryService";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Field, Form, Formik} from "formik";
import 'bootstrap/dist/css/bootstrap.css';

function CreateBook() {
    const navigate = useNavigate();

    const book = {
        title: "",
        quantity: 0
    }

    const createABook = async (value) => {
        try {
            await create(value);
            toast("Thêm mới thành công");
            navigate("/books/list");
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Formik initialValues={book} onSubmit={(values, {setSubmitting, resetForm}) => {
                setTimeout(() => {
                    setSubmitting(false);
                }, 5000)
                createABook(values);
                resetForm(book);
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
    )
}

export default CreateBook;