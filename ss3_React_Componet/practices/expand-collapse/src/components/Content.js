import {Component} from "react";
import Header from "./Header";

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpand : false
        }
    }
    handleExpand = () => {
        this.setState({isExpand : true})
    }
    handleChange = () => {
        this.setState({isExpand : false})
    }
    render() {
        if(this.state.isExpand) {
            return (
                <>
                    <Header></Header>
                    <button onClick={this.handleChange}>Xem giới thiệu</button>
                    <p>ReactJs</p>
                </>
            )
        }
        return(
            <>
                <Header></Header>
                <button onClick={this.handleExpand}>Xem giới thiệu</button>
            </>
        )

    }
}

export default Content;