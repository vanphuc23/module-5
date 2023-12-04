import {Component} from "react";

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number1: 0,
            number2: 0,
            display: false,
            result: 0
        }
    }

    changeNumber1 = (number1) => {
        this.setState({number1: number1})
    }
    changeNumber2 = (number2) => {
        this.setState({number2: number2})
    }
    handleCalculatorPlus = () => {
        this.setState({display: true})
        this.setState({result: parseInt(this.state.number1) + parseInt(this.state.number2) });
    }

    render() {
        return (
            <>
                {!this.state.display ?
                    <>
                        <input type={'number'} onChange={(evt) => this.changeNumber1(evt.target.value)}
                               value={this.state.number1}/>
                        <input type={'number'} onChange={(evt) => this.changeNumber2(evt.target.value)}
                               value={this.state.number2}/>
                        <button onClick={this.handleCalculatorPlus}>+</button>
                    </> :
                    <>
                        <input type={'number'} onChange={(evt) => this.changeNumber1(evt.target.value)}
                               value={this.state.number1}/>
                        <input type={'number'} onChange={(evt) => this.changeNumber2(evt.target.value)}
                               value={this.state.number2}/>
                        <button onClick={this.handleCalculatorPlus}>+</button>
                        <p>{this.state.result}</p>
                    </>
                }
            </>
        )
    }
}

export default Calculator;