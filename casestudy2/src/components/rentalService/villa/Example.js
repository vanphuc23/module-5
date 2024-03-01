import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as Yup from "yup";
import {listRentalType,updateVilla} from "../../../service/rentalService/Villa";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";

function Example(props) {
  const {show, setShow, data,showList} = props;
  const [rentalType, setRentalType] = useState([]);

  const handleClose = () => setShow(false);

  const list = async () => {
    let temp = await listRentalType();
    setRentalType(temp);
}

useEffect(() => {
    list();
}, []);

  const update = async (value) => {
    await updateVilla(value);
    toast.success("Update Success");
    showList();
}

const validate = {
    serviceName: Yup.string().required("Required").matches(/^[^\d]+$/,"Tên dịch vụ không được chứa số"),
    swimmingPoolArea: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1,"Số nhập vào phải lớn hơn 0"),
    floors: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1,"Số nhập vào phải lớn hơn 0"),
    usableArea: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1,"Số nhập vào phải lớn hơn 0"),
    rentalCosts: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1,"Số nhập vào phải lớn hơn 0"),
    people: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1,"Số nhập vào phải lớn hơn 0"),
    roomStandards: Yup.string().required("Required"),
    otherAmenitiesDescribed: Yup.string().required("Required")
}
  

  return (
    <>
      

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik initialValues={data} onSubmit={(value,{setSubmitting}) => {
                setTimeout(() => {
                    setSubmitting(false);
                },1000);
                handleClose();
                let temp = {...value,rentalType:JSON.parse(value.rentalType)};
                update(temp);
            }} validationSchema={Yup.object(validate)}>
                {
                    ({isSubmitting}) => (
                     <Form>
                         <h1 style={{textAlign:"center"}}>Cập nhật dịch vụ Villa</h1>
                         <div className="container">
                             <div className="mb-3">
                                 <label htmlFor="serviceName" className="form-label">Tên dịch vụ:</label>
                                 <Field type="text" className="form-control" id="serviceName" name="serviceName"/>
                                 <ErrorMessage name="serviceName" component="span" style={{color:"red"}}></ErrorMessage>
                             </div>
                             <div className="mb-3">
                                 <label htmlFor="usableArea" className="form-label">Diện tích sử dụng:</label>
                                 <Field type="text" className="form-control" id="usableArea" name="usableArea"/>
                                 <ErrorMessage name="usableArea" component="span" style={{color:"red"}}></ErrorMessage>
                             </div>
                             <div className="mb-3">
                                 <label htmlFor="rentalCosts" className="form-label">Chi phí thuê:</label>
                                 <Field type="text" className="form-control" id="rentalCosts" name="rentalCosts"/>
                                 <ErrorMessage name="rentalCosts" component="span" style={{color:"red"}}></ErrorMessage>
                             </div>
                             <div className="mb-3">
                                 <label htmlFor="people" className="form-label">Số lượng người tối đa:</label>
                                 <Field type="text" className="form-control" id="people" name="people"/>
                                 <ErrorMessage name="people" component="span" style={{color:"red"}}></ErrorMessage>
                             </div>
                             <div className="mb-3">
                                 <label htmlFor="rentalType" className="form-label">Kiểu thuê:</label>
                                 <Field as="select" className="form-select" id="rentalType"
                                        aria-label="Default select example"
                                        name="rentalType" required>
                                     <option value="">--Chọn kiểu thuê--</option>
                                     {rentalType.map((item, index) => (
                                         <option key={index} value={JSON.stringify(item)}>{item.type}</option>
                                     ))}
                                 </Field>
                             </div>
                             <div className="mb-3">
                                 <label htmlFor="roomStandards" className="form-label">Tiêu chuẩn phòng:</label>
                                 <Field type="text" className="form-control" id="roomStandards" name="roomStandards"/>
                                 <ErrorMessage name="roomStandards" component="span" style={{color:"red"}}></ErrorMessage>
                             </div>
                             <div className="mb-3">
                                 <label htmlFor="otherAmenitiesDescribed" className="form-label">Mô tả tiện nghi khác:</label>
                                 <Field type="text" className="form-control" id="otherAmenitiesDescribed" name="otherAmenitiesDescribed"/>
                                 <ErrorMessage name="otherAmenitiesDescribed" component="span" style={{color:"red"}}></ErrorMessage>
                             </div>
                             <div className="mb-3">
                                 <label htmlFor="swimmingPoolArea" className="form-label">Diện tích hồ bơi:</label>
                                 <Field type="text" className="form-control" id="swimmingPoolArea" name="swimmingPoolArea"/>
                                 <ErrorMessage name="swimmingPoolArea" component="span" style={{color:"red"}}></ErrorMessage>
                             </div>
                             <div className="mb-3">
                                 <label htmlFor="floors" className="form-label">Số tầng:</label>
                                 <Field type="text" className="form-control" id="floors" name="floors"/>
                                 <ErrorMessage name="floors" component="span" style={{color:"red"}}></ErrorMessage>
                             </div>
                             {
                                 isSubmitting?<></>:
                                 <Modal.Footer>
                                 <Button variant="secondary" onClick={handleClose}>
                                   Close
                                 </Button>
                                 <Button type='submit' variant="primary">Update</Button>
                               </Modal.Footer>
                             }
                         </div>
                     </Form>
                    )
                }
            </Formik>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default Example;