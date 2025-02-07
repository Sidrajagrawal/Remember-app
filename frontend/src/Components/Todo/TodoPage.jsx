import axios from 'axios';
import { useEffect, useState, React } from 'react';
import './TodoPage.css';
import DisplayPage from './DisplayPage';

const TodoPage = () => {

  const [todoFetchData, setTodoFetchData] = useState([]);
  const [cardflag, setcardFlag] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const handlecard = (id) => {
    if (id) {
      setcardFlag(true);
      setSelectedId(id);
    }else{
      setcardFlag(false);
      setSelectedId(null);
    }
  }

  const fetchData = async (url, setData) => {
    try {
      const response = await axios.get(url);
      setData(response.data || []);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      setData([]);
    }
  };

  const cleanTodoContent = (content) => {
    return content.replace(/^,/, '');
  };


  useEffect(() => {
    fetchData("http://127.0.0.1:8000/todo/detail/", setTodoFetchData);
  }, []);


  return (
    <div className='Main-Container'>
      <div className='Todo-Conatiner mx-4'>
        <div className="row TodoRow">
          {todoFetchData.length > 0 ? (todoFetchData.map((item) => (

            <div className=" CARD mt-4 ms-4  p-3 col-md-3 " style={{ width: "18rem" }} key={item.id} onClick={() => handlecard(item.id)}>
              <div className="card-header">{item.todo_title}</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item ps-4 ">{
                  cleanTodoContent(item.todo_content).split(',').slice(0, 3).map((i, index) => (
                    <li key={index}>{i.trim()}</li>
                  ))
                }</li>
              </ul>
            </div>

          ))) : <p>No Todo Added</p>}
        </div>

      </div>
      {cardflag && <DisplayPage id={selectedId} func={handlecard}></DisplayPage>}
    </div>
  )
}

export default TodoPage
