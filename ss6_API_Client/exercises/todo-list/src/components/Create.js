import {Field, Form, Formik} from "formik";
import * as ListService from "../service/ListService";
import {toast} from "react-toastify";

export function Create(props) {
    const newTodo = {
        userId: 0,
        title: "",
        completed: false
    }
    const create = async (value) => {
        try {
            await ListService.create(value);
            toast("Create Success");
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <Formik initialValues={newTodo} onSubmit={(value, {setSubmitting, resetForm}) => {
                create(value);
                setTimeout(() => {
                    setSubmitting(false);
                },5000)
                props.resert(true);
                resetForm(newTodo);
            }}
            >
                {
                    ({isSubmitting}) => (
                        <Form>
                            <Field type="text" name="title"/> <br/>
                            {
                                isSubmitting ? <></> :
                                    <button type="submit">Submit</button>
                            }
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}