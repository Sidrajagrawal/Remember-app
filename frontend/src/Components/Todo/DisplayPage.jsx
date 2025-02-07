import React, { useEffect, useState } from 'react';
import './DisplayPage.css';
import axios from 'axios';

const DisplayPage = (props) => {
  const [data, setData] = useState(null);

  const changeflag = () => {
    props.func(null);
  };

  const pkbasedData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/todo/detail/${props.id}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
      setData(null);
    }
  };

  const DeleteTodo = async ()=>{
    const isConfirmed = window.confirm('Are you sure to delete this Note?');
    if (isConfirmed){
        try {
          await axios.delete(`http://127.0.0.1:8000/todo/detail/${props.id}`).then(() => {
            props.func(null);
          });
        } catch (error) {
          console.error(error);
        }
      }else{
        return
      }
  }

  const cleanTodoContent = (content) => {
    return content.replace(/^,/, '');
  };

  useEffect(() => {
    pkbasedData();
  }, [props.id]);

  return (
    <div className='Page-Conatiner mx-4'>
      <div className="pagebody">
        {data ? (
          <>
            <h4 className='ms-4 mt-4'>Title: {data.todo_title}
                <button className='ms-1 Deletebtn' onClick={DeleteTodo}>
                <i className="ri-delete-bin-line"></i>
                </button>
            </h4>
            <hr />
            <ul>
              {cleanTodoContent(data.todo_content).split(',').map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="cross-btn">
        <button onClick={changeflag}><i className="ri-close-line"></i></button>
      </div>
    </div>
  );
};

export default DisplayPage;
