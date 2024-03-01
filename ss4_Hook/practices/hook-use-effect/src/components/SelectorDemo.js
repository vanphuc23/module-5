import {useEffect, useState} from "react";

export function SelectorDemo() {
    const [selected, setSelected] = useState("0");
    const [valueSelected, setValueSelected] = useState("");
    const choice = (e) => setSelected(e);
    useEffect(() => {
        switch (selected) {
            case "0":
                setValueSelected("Java");
                break;
            case "1":
                setValueSelected("Angular");
                break;
            case "2":
                setValueSelected("Javascript");
                break;
            case "3":
                setValueSelected("Php");
                break;
            default:
        }
    }, [selected])
    return (
        <div>
            Khoá học :
            <select
                onChange={e => {
                    choice(e.target.value);
                }}
            >
                <option value="0">Java</option>
                <option value="1">Angular</option>
                <option value="2">Javascript</option>
                <option value="3">Php</option>
            </select>
            <h2>Your selected: {valueSelected}</h2>
        </div>
    );
}