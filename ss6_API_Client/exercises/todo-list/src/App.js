import './App.css';
import List from "./components/List";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <>
      <List></List>
          <ToastContainer position='top-center'/>
      </>
  );
}

export default App;
