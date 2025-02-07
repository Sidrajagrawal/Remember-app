import React from 'react'
import './CreateNotes.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import axios from 'axios';

const CreateNotes = () => {
  const editor = useRef(null);
  const [note_title, setNoteTitle] = useState("");
  const navigate = useNavigate()

  const config = {
    placeholder: 'Take a Note...',
    height: 330
  }
  
  const sendData = async() => {
    const note_content = editor.current.value;

    if(note_content==="" && note_title===""){
      alert("Fill the Required Field");
      return
    }

    let formField= new FormData();
    formField.append('note_title',note_title)
    formField.append('note_content',note_content)

    await axios({
      method:'post',
      url : 'http://127.0.0.1:8000/note/detail/',
      data: formField
    }).then((response)=>{
      console.log(response.data);
      navigate('/');
    })
  }

  return (
    <div className='CreateNotes-Container mt-4'>
      <p className='solog'>Write Note Below...</p>
      <hr />
      <div className="titleInput">
        <input 
          type="text" 
          placeholder='Title' 
          name='note_title'
          value={note_title}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
      </div>
      <div className="textInput">
        <JoditEditor
          ref={editor}
          config={config}
          name='note_content'
        />
      </div>
      <div className="Savebutton">
        <button className='btn btn-success' onClick={sendData}>Save</button>
        <button className="btn btn-danger" onClick={() => {
          if (editor.current) {
            editor.current.value = '';
          }
        }}>Reset</button>
      </div>
    </div>
  )
}

export default CreateNotes;