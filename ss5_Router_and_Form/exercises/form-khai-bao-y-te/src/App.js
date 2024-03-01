import logo from './logo.svg';
import './App.css';
import Medical from "./components/Medical";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <Medical></Medical>
            <ToastContainer position="top-center"/>
        </>
    );
}

export default App;
