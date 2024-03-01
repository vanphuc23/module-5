import {useEffect, useState} from "react";
import {deleteVilla, fetchAll, list} from "../../services/Service";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";

function ListService() {
    const [service, setService] = useState([]);
    const [deleteId, setDeleteId] = useState();

    const [pageCounts, setPageCounts] = useState(0);
    const [page, setPage] = useState(0);
    const limit = 4;
    const [search, setSearch] = useState('');

    // Phân trang

    // const [currentPage, setCurrentPage] = useState(1);
    // const recordsPerPage = 2;
    // const lastIndex = currentPage * recordsPerPage;
    // const firstIndex = lastIndex - recordsPerPage;
    // const records = service.slice(firstIndex, lastIndex);
    // const npage = Math.ceil(service.length / recordsPerPage);
    // const numbers = [...Array(npage + 1).keys()].slice(1);

    // Phân trang

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/Service?_page=1&_limit=${limit}&serviceName_like=${search}&_sort=serviceName&_order=asc`);
                const total = res.headers.get('x-total-count');
                setPageCounts(Math.ceil(total / limit));
                setService(res.data);
            } catch (e) {
                console.log(e);
            }
        }
        getComments();
    }, [search]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const findAll = async () => {
        let temp = await fetchAll(page, limit, search);
        setService(temp);
    }

    const findId = (id) => {
        setDeleteId(id);
    }

    const deleteById = async (id) => {
        try {
            await deleteVilla(id);
            await findAll();
            toast.success("Delete Success");
        } catch (e) {
            console.log(e);
        }
    }

    const linkEdit = (id, service) => {
        if (service === "Villa") {
            return (
                <NavLink to={`/service/villa/edit/${id}`} className="btn btn-primary"
                         style={{marginRight: 10}}>Edit</NavLink>
            )
        } else if (service === "Room") {
            return (
                <NavLink to={`/service/room/edit/${id}`} className="btn btn-primary"
                         style={{marginRight: 10}}>Edit</NavLink>
            )
        } else if (service === "House") {
            return (
                <NavLink to={`/service/house/edit/${id}`} className="btn btn-primary"
                         style={{marginRight: 10}}>Edit</NavLink>
            )
        }
    }

    // Phân trang
    // const nextPage = () => {
    //     if (currentPage !== npage) {
    //         setCurrentPage(currentPage + 1);
    //     }
    // }
    //
    // const prePage = () => {
    //     if (currentPage !== 1) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // }
    //
    // const changeCPage = (id) => {
    //     setCurrentPage(id);
    // }

    // Phân trang

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        setPage(currentPage);
        const commentsFormServer = await fetchAll(currentPage, limit, search);
        setService(commentsFormServer);
    }
    if (!service) return null;

    return (
        <>
            <h1 style={{textAlign: "center"}}>Danh sách dịch vụ</h1>

            {/*<div>*/}
            {/*    <ul>*/}
            {/*        <li>*/}
            {/*            <a href="#">Languages </a>*/}
            {/*            <ul className="dropdown">*/}
            {/*                <li><a href="#">HTML</a></li>*/}
            {/*                <li><a href="#">CSS</a></li>*/}
            {/*                <li><a href="#">Javascript</a></li>*/}
            {/*                <li><a href="#">Java</a></li>*/}
            {/*            </ul>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</div>*/}

            <div className="dropdown container" style={{marginBottom: '50px'}}>
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                   data-bs-toggle="dropdown" aria-expanded="false">
                    Add new service
                </a>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><NavLink to={"/service/villa/create"} className="dropdown-item">Villa</NavLink></li>
                    <li><NavLink to={"/service/house/create"} className="dropdown-item">House</NavLink></li>
                    <li><NavLink to={"/service/room/create"} className="dropdown-item">Room</NavLink></li>
                </ul>
            </div>

            <div>
                <input type="text" value={search} onChange={handleSearch}/>
            </div>

            <table className="table container">
                <thead>
                <tr>
                    <th>Tên dịch vụ</th>
                    <th>Diện tích sử dụng</th>
                    <th>Chi phí thuê</th>
                    <th>Số lượng người tối đa</th>
                    <th>Kiểu thuê</th>
                    <th>Option</th>
                </tr>
                </thead>
                <tbody>
                {service.map((item, index) => (
                    <tr key={index}>
                        <td>{item.serviceName}</td>
                        <td>{item.area}</td>
                        <td>{item.rentalCosts}</td>
                        <td>{item.peopleMax}</td>
                        <td>{item.rentalType.type}</td>
                        <td>
                            {linkEdit(item.id, item.serviceType.service)}
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => {
                                        findId(item.id)
                                    }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/*Phân trang*/}

            {/*<nav>*/}
            {/*    <ul className='pagination'>*/}
            {/*        <li className='page-item'>*/}
            {/*            <a href="#" className='page-link' onClick={prePage}>Prev</a>*/}
            {/*        </li>*/}
            {/*        {*/}
            {/*            numbers.map((n, i) => (*/}
            {/*                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>*/}
            {/*                    <a href= "#" onClick={() => changeCPage(n)} className='page-link'>{n}</a>*/}
            {/*                </li>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*        <li className='page-item'>*/}
            {/*            <a href="#" className='page-link' onClick={nextPage}>Next</a>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</nav>*/}

            {/*Phân trang*/}

            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCounts}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination justify-content-center"
                activeClassName="active"
            />

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {deleteId}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => {
                                deleteById(deleteId)
                            }}>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ListService;