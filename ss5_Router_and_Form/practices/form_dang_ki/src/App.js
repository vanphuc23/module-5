import './App.css';
import {DemoForm} from "./components/DemoForm";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <DemoForm></DemoForm>
            <ToastContainer position="top-center"/>
        </>
    );
}

export default App;
