import {useEffect, useState} from "react";

function Car() {
const carList = ['Mer','Toyota'];
const colorList = ['Black','White'];
const [selectedCar, setSelectedCar] = useState({
    car: carList[0],
    color: colorList[0]
})
    const handle = (evt, type) => {
    setSelectedCar((e)=>{
        return {
           ...e,
            [type]: evt
        }
    });
    }
    // const colorHandle = (evt) => {
    // setSelectedCar((e)=>{
    //     return {
    //         color :evt,
    //         car: e.car
    //     }
    // });
    // }
    return(
        <>
        <h1>Select your car</h1>
            <span>Select a car  </span>
            <select
            onChange={(e) => {
                handle(e.target.value, "car")
            }}
            >
                {carList.map((item,index)=>(
                    <option value={item} key={index}>{item}</option>
                ))}
            </select>
            <span>Select a color  </span>
            <select
                onChange={(e) => {
                    handle(e.target.value, "color")
                }}
            >
                {colorList.map((item,index)=>(
                    <option value={item} key={index}>{item}</option>
                ))}
            </select>
            <h3>You selected a {selectedCar.car} - {selectedCar.color}</h3>
        </>
    )
}

export default Car;