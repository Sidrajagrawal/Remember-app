import React, { useState} from 'react';
import './CreateTodo.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTodos = () => {

  const [todo_content, settodo_content] = useState("");
  const [todo_title, setinputTitle] = useState("");
  const [newtodo,setnewtodo]=useState([]);
  const [todos, setTodos] = useState([{ id: 0, content: "" }]);
  const [idcount, setIdCount] = useState(1);
  const [flag, setFlag]=useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    settodo_content(e.target.value);
  }
  const handleTitleChange=(e)=>{
    setinputTitle(e.target.value);
  }

  const addtodos = () => {
    if (todo_content === "") {
      alert("First Fill the todo...");
      return
    }
    setIdCount(idcount + 1);
    setTodos((prevTodo) => [...prevTodo, { id: idcount, content: todo_content }]);
    setFlag(true)
    settodo_content("");
  }

  const deletetodo = (id) => {
    if (todos.length !== 1) {
      let newtodo = todos.filter((todo) => todo.id !== id);
      setTodos(newtodo);
    }
  }

  const SaveTodo= async()=>{

    if (todo_title === "") {
      alert("First fill the title...");
      return;
    }

    for(let i in todos){
      setnewtodo((prev)=>[...prev,todos[i].content])
    }

    const formField= new FormData();
    formField.append('todo_title',todo_title);
    formField.append('todo_content',newtodo);

    try {
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/todo/detail/',
        data: formField,
      });
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error("Error saving the todo:", error);
    }
  }

  return (
    <div className="main col-md-12">
      <div className='Todo-Conatainer CustomeScrollBar mt-4 mx-4 ms-4 col-md-7'>

        <div className="todo-title">
          <input type="text" placeholder='Title of Todo...' onChange={handleTitleChange}/>
          <button className='savebtn' onClick={SaveTodo}><i className="ri-check-line"></i></button>
          <span className='savecap'>Save</span>
        </div>

        {todos.map((i) => {
          return (
            <div key={i.id} className="todo-body">
              <div>
                <input type="text" placeholder='Enter Todo...' onChange={handleChange} />
              </div>

              <div className="todo-body-btn">
                <button className='add' onClick={addtodos}><i className="ri-add-line"></i></button>
                <button className='cross-delete' onClick={() => deletetodo(i.id)}><i className="ri-close-line"></i></button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="listTodo CustomeScrollBar col-md-4 mt-4">
        <h2 className='text-center mt-3 itemHead'>Preview</h2>
        {flag && todos.map((i)=>{
          return(
            <h3 className='ms-4 itemDisplay'>{i.id!==0?i.content:""}</h3>
          )
        })}
      </div>
    </div>
  )
}

export default CreateTodos
