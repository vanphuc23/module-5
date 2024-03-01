import {useEffect, useState} from "react";
import questionApi from "../api/questionApi";
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";

function List() {
    const [question, setQuestion] = useState([]);
    let stt = 1;

    useEffect( () => {
        const fetchQuestion = async () => {
            const questionList = await questionApi.getAll();
            setQuestion(questionList);
        }

         fetchQuestion();
    }, []);

    console.log(question)

    if(!question) return null;

    return (
        <>
            <h1 style={{textAlign: "center"}}>Danh sách câu hỏi</h1>
            <table className='table container'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tiêu đề</th>
                    <th>Loại câu hỏi</th>
                    <th>Ngày đăng</th>
                    <th>Tình trạng</th>
                </tr>
                </thead>
                <tbody>
                {
                    question.map((item, index) => (
                        <tr key={index}>
                            <td>{stt++}</td>
                            <td>{item.title}</td>
                            <td>{item.questionType.questionName}</td>
                            <td>{moment(item.dateCreate).format('DD/MM/yyyy')}</td>
                            <td>{item.status === 0 ? "Chờ phản hồi":"Đã phản hồi"}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

export default List;
