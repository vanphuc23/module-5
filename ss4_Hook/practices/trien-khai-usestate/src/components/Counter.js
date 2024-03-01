import {useState} from "react";

export function Counter() {
    const [count,setCount] = useState(0);
    const handleClick = () => {
        setCount(count + 1);
    }
    return(
        <>
        Giá trị của {count}
            <button onClick={handleClick}>Tăng</button>
        </>
    )
}