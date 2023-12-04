import {Component} from "react";
import Header from "./Header";

class Work extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            item: "",
            display: false
        }
    }

    handleChange = (evt) => {
        this.setState({item: evt.target.value})
    }
    handleAddItem = () => {
        if (this.state.item === "") {
            alert('Bạn chưa nhập nghề nghiệp!!!')
        } else {
            this.state.list.push(this.state.item);
            this.setState({display: true})
            this.setState({item: ""})
        }
    }

    render() {
        return (
            <>
                {!this.state.display ?
                    <>
                        <Header></Header>
                        <div style={{textAlign: 'center'}}>
                            <input onChange={(evt) => this.handleChange(evt)} value={this.state.item}/>
                            <button onClick={this.handleAddItem}>Add</button>
                        </div>
                    </> :
                    <>
                        <Header></Header>
                        <div style={{textAlign: 'center'}}>
                            <input onChange={(evt) => this.handleChange(evt)} value={this.state.item}/>
                            <button onClick={this.handleAddItem}>Add</button>
                        </div>
                        <table>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Item</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.list.map((item, index) => (
                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{item}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                }
            </>
        )
    }
}

export default Work;