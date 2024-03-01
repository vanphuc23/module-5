import logo from './logo.svg';
import './App.css';
import ListBook from "./components/ListBook";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import CreateBook from "./components/CreateBook";
import EditBook from "./components/EditBook";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./components/NotFound";


function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="books/list" element={<ListBook/>}></Route>
                  <Route path="books/create" element={<CreateBook/>}></Route>
                  <Route path={`/books/edit/:id`} element={<EditBook/>}></Route>
                  <Route path="*" element={<NotFound/>}></Route>
              </Routes>
              <ToastContainer position="top-center"/>
          </BrowserRouter>

      </>
  );
}

export default App;
