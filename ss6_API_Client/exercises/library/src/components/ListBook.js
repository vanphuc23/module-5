import {useEffect, useState} from "react";
import * as ListService from "../service/LibraryService";
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink, useNavigate} from "react-router-dom";
import {deleteById} from "../service/LibraryService";

function ListBook() {
    const [book, setBook] = useState([]);
    const getAllBook = async () => {
        try {
            let temp = await ListService.findAll();
            setBook(temp);
            console.log(temp);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllBook();
    }, []);

    const deleteId = async (id) => {
        let temp = window.confirm("DELETE");
        if (temp) {
            try {
                console.log(id);
                await deleteById(id);
                getAllBook();
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <>
            <div>
                <h1>Library</h1>
                <NavLink to="/books/create" className='btn btn-success'>Add a new Book</NavLink>
            </div>
            <div className='container'>
                <table className='table'>
                    <tr>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                    {book.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <NavLink to={`/books/edit/${item.id}`} className='btn btn-primary'>Edit</NavLink>
                                <button className='btn btn-danger' onClick={() => {
                                    deleteId(item.id)
                                }}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    )
}

export default ListBook;