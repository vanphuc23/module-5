import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {listRentalType} from "../../../service/rentalService/Villa";
import {Formik} from "formik";
import * as Yup from "yup";

function CreateNewHouse() {
    const navigate = useNavigate();
    const [rentalType,setRentalType] = useState([]);
    const house = {
        serviceName: "",
        usableArea: 0,
        rentalCosts: 0,
        people: 0,
        roomStandards: "",
        otherAmenitiesDescribed: "",
        floors: 0
    }

    const list = async () => {
        let temp = await listRentalType();
        setRentalType(temp);
    }

    useEffect(() => {
        list();
    }, []);

    const validate = {
        serviceName: Yup.string().required("Required").matches(/^[^\d]+$/,"Tên dịch vụ không được chứa số"),
        floors: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1,"Số nhập vào phải lớn hơn 0"),
        usableArea: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1,"Số nhập vào phải lớn hơn 0"),
        rentalCosts: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1,"Số nhập vào phải lớn hơn 0"),
        people: Yup.number().required("Required").integer("Số nhập vào phải là số nguyên dương").positive("Số nhập vào phải là số nguyên dương").min(1,"Số nhập vào phải lớn hơn 0"),
        roomStandards: Yup.string().required("Required"),
        otherAmenitiesDescribed: Yup.string().required("Required")
    }

    if(!rentalType) return null;

    return (
        <Formik initialValues={house} onSubmit={(value,{setSubmitting}) => {

        }} validationSchema={Yup.object(validate)}></Formik>
    )
}

export default CreateNewHouse;