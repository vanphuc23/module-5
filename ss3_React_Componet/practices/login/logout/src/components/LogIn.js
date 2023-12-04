import {Component} from "react";
import LogOut from "./LogOut";

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }
    handleLogin = () => {
        this.setState({isLoggedIn:true})
    }
    handleLogout = () => {
        this.setState({isLoggedIn:false})
    }
    render() {
        if(this.state.isLoggedIn) {
            return (
                <LogOut onLogOut={this.handleLogout}></LogOut>
            )
        }
        return (
            <div style={{textAlign:'center'}}>
                <div>
                    <h1>Please Log in</h1>
                    <button onClick={this.handleLogin}>Log in</button>
                </div>
            </div>
        )
    }
}
export default LogIn;