import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';

function UseIncrement() {
    const [count, setCount] = useState({
        count1: 0,
        count2: 0
    });
    const increase = (prev, type) => {
        setCount((e) => {
            return {
                ...e,
                [type]: prev + 1
            }
        })
    }
    return (
        <>
            <p>{count.count1}</p>
            <button className={'btn btn-primary'} onClick={() => increase(count.count1, 'count1')}>Add 1</button>
            <p>{count.count2}</p>
            <button className={'btn btn-primary'} onClick={() => increase(count.count2, 'count2')}>Add 2</button>
        </>
    )
}

export default UseIncrement;