
import './App.css';
import Library from "./components/Library";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EditLibrary from "./components/EditLibrary";

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/library" element={<Library/>}></Route>
                  <Route path="/library/edit" element={<EditLibrary/>}></Route>
              </Routes>
              <ToastContainer position={'top-center'}/>
          </BrowserRouter>

      </>
  );
}

export default App;
