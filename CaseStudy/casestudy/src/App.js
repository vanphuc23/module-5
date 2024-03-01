import './App.css';
import ListService from "./components/service/ListService";
import CreateServiceVilla from "./components/service/villa/CreateServiceVilla";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NotFound} from "./components/NotFound";
import EditServiceVilla from "./components/service/villa/EditServiceVilla";
import EditServiceRoom from "./components/service/room/EditServiceRoom";
import EditServiceHouse from "./components/service/house/EditServiceHouse";
import CreateServiceHouse from "./components/service/house/CreateServiceHouse";
import CreateServiceRoom from "./components/service/room/CreateServiceRoom";
import ListCustomer from "./components/customer/ListCustomer";

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/services/list" element={<ListService/>}></Route>
                  <Route path="/service/villa/create" element={<CreateServiceVilla/>}></Route>
                  <Route path="/service/house/create" element={<CreateServiceHouse/>}></Route>
                  <Route path="/service/room/create" element={<CreateServiceRoom/>}></Route>
                  <Route path="/service/villa/edit/:id" element={<EditServiceVilla/>}></Route>
                  <Route path="/service/room/edit/:id" element={<EditServiceRoom/>}></Route>
                  <Route path="/service/house/edit/:id" element={<EditServiceHouse/>}></Route>
                  <Route path="/customer/list" element={<ListCustomer/>}></Route>
                  <Route path="*" element={<NotFound/>}></Route>
              </Routes>
              <ToastContainer position={"top-center"} autoClose={1000}></ToastContainer>
          </BrowserRouter>
      </>
  );
}

export default App;
