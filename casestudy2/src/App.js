import logo from './logo.svg';
import './App.css';
import VillaList from "./components/rentalService/villa/VillaList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateNewVilla from "./components/rentalService/villa/CreateNewVilla";
import {ToastContainer} from "react-toastify";
import NotFound from "./components/NotFound";
import 'react-toastify/dist/ReactToastify.css';
import VillaEdit from "./components/rentalService/villa/VillaEdit";
import CreateNewHouse from "./components/rentalService/house/CreateNewHouse";
  import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="service/villa" element={<VillaList/>}></Route>
                  <Route path="service/villa/create" element={<CreateNewVilla/>}></Route>
                  <Route path="service/villa/edit/:id" element={<VillaEdit/>}></Route>
                  <Route path="service/house/create" element={<CreateNewHouse/>}></Route>
                  <Route path="*" element={<NotFound/>}></Route>
              </Routes>
              <ToastContainer position={"top-center"} autoClose={1000}></ToastContainer>
          </BrowserRouter>
      </>
  );
}

export default App;
