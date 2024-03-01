import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import "bootstrap/dist/css/bootstrap.css"

const formSchema = yup.object().shape({
  name: yup.string().required('Required'),
  email: yup.string().required('Required').email('Invalid Email'),
  phone: yup.string().required('Required')
});

function App() {

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      alert("Valid!!!");
    }
  });

  return (
      <div>
        <h1>Contact Form</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={formik.values.name} onChange={formik.handleChange} className={
                'form-control' +
                (formik.errors.name && formik.touched.name
                    ? ' is-invalid'
                    : '')
            }
            />
            <div className="invalid-feedback">
              {formik.errors.name && formik.touched.name
                  ? formik.errors.name
                  : null}
            </div>
          </div>

          <div className="form-group">
            <div>Email</div>
            <input name="email" value={formik.values.email} onChange={formik.handleChange} className={
                'form-control' +
                (formik.errors.email && formik.touched.email
                    ? ' is-invalid'
                    : '')
            }
            />
            <div className="invalid-feedback">
              {formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : null}
            </div>
          </div>

          <div className="form-group">
            <div>Phone</div>
            <input name="phone" value={formik.values.phone} onChange={formik.handleChange} className={
                'form-control' +
                (formik.errors.phone && formik.touched.phone
                    ? ' is-invalid'
                    : '')
            }
            />
            <div className="invalid-feedback">
              {formik.errors.phone && formik.touched.phone
                  ? formik.errors.phone
                  : null}
            </div>
          </div>

          <div className="form-group">
            <div>Message</div>
            <textarea className="form-control" name="message" value={formik.values.message}
                      onChange={formik.handleChange}></textarea>
          </div>
          <div className="mt-3">
            <button className="btn btn-primary">Submit</button>
          </div>

        </form>
      </div>
  );
}

export default App;