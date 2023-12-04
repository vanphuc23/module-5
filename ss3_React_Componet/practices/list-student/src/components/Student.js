import {Component} from "react";
import {render} from "@testing-library/react";

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: [
                {
                    "id": 1,
                    "name": "Nguyễn Văn A",
                    "age": 30,
                    address: "Hà Nội"
                }
            ]
        }
    }

    render() {
        return (
            <>
                <table style={{border: '1px solid black'}}>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.student.map((items) => (
                        <tr>
                            <td>{items.id}</td>
                            <td>{items.name}</td>
                            <td>{items.age}</td>
                            <td>{items.address}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </>
        )
    }
}

export default Student;