import {useEffect, useState} from "react";

export function Time() {
    const [time, setTime] = useState(10);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(prevState => prevState -1);
        }, 1000);
        if (time === 0) {
            return () => {
                alert("Time's up");
            };
        }
        return () => clearInterval(intervalId);
    }, [time]);

    return (
        <>
            <p>Count down from {time}</p>
        </>
    )
}