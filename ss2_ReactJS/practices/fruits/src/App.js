import logo from './logo.svg';
import './App.css';

function App() {
  const fruits = [
    "Apple",
    "Banana",
    "Orange",
    "Apricot",
    "Black rowan",
    "Cranberry"
  ]; 
  return (
    <>
        <h1>List of fruits</h1>
    <ul>
      {fruits.map(item => (
        <li>{item}</li>
))}
    </ul>
    </>
  );
}

export default App;
