import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import NotFound from "./components/NotFound";
import List from "./components/List";
import Create from "./components/Create";

function App() {
  return (
      <>
          <BrowserRouter>
              <div style={{textAlign:'center'}}>
                  <NavLink to={'/product/list'} className={'btn btn-outline-primary'}>Product</NavLink>
              </div>
              <Routes>
                  <Route path={'/product/list'} element={<List/>}></Route>
                  <Route path={'/product/create'} element={<Create/>}></Route>
                  <Route path={'*'} element={<NotFound/>}></Route>
              </Routes>
              <ToastContainer position={'top-center'} autoClose={1000}></ToastContainer>
          </BrowserRouter>
      </>
  );
}

export default App;
