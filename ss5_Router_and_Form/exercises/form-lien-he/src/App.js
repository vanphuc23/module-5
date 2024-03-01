import logo from './logo.svg';
import './App.css';
import {ContactForm} from "./components/ContactForm";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <>
      <ContactForm></ContactForm>
      <ToastContainer position={"top-center"} />
      </>
  );
}

export default App;
