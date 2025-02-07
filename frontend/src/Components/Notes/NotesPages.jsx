import React, { useEffect, useState, useRef } from 'react';
import './NotePages.css';
import axios from 'axios';
import JoditEditor from 'jodit-react';

const NotesPages = () => {
  const editor = useRef(null);

  const [NoteData, setNoteData] = useState([]);
  const [pkData, setpkData] = useState(null);
  const [flag, setflag] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });

  const config = { placeholder: 'Take a Note...', height: 400,  };

  const DeleteData = async (id) => {
    const isConfirmed = window.confirm('Are you sure to delete this Note?');
    if (isConfirmed){
      try {
        await axios.delete(`http://127.0.0.1:8000/note/detail/${id}`).then(() => {
          setflag(false);
          FetchData();
        });
      } catch (error) {
        console.error(error);
      }
    }else{
      return
    }
  };

  const handledisplay = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/note/detail/${id}`);
      setpkData(response.data);
      setflag(true);
    } catch (error) {
      console.log(error);
    }
  };

  const FetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/note/detail/');
      setNoteData(response.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const htmlToText = (html) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
  };

  const handleEdit = () => {
    setEditMode(true);
    setFormData({ title: pkData.note_title, content: pkData.note_content });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value,  }));
  };

  const handleContentChange = (content) => {
    setFormData((prevData) => ({...prevData,  content,}));
  };

  const handlePut = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/note/detail/${pkData.id}`, {
        note_title: formData.title,
        note_content: formData.content,
      });
      setEditMode(false);
      handledisplay(pkData.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-note-conatiner">
      <div className="NoteContainer mt-2 mx-4">
        <h2 className="text-center">ALL Notes</h2>
        <div className="NoteCard row">
          {NoteData && NoteData.length > 0 ? (
            NoteData.map((i) => (
              <div className="card NotePageCard ms-4 col-md-3" style={{ width: '18rem' }} key={i.id}>
                <div className="card-body">
                  <h5 className="card-title">{i.note_title}</h5>
                  <p className="card-text">
                    {htmlToText(i.note_content.length > 100 ? i.note_content.slice(0, 100) : i.note_content)}
                  </p>
                  <button onClick={() => handledisplay(i.id)} className="btn btn-warning">
                    See...
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h5 className="text-center">No Content Available</h5>
          )}
        </div>
      </div>
      {flag && pkData && (
        <div className="NotePageDisplay mx-3">
          <div className="pages">
            <div className="pagebody">
              {editMode ? (
                <div className="edit-form">
                  <h4 className="ms-4 mt-4">
                    Edit Note
                    <div className="mt-2">
                      <button className="ms-1 Savebtn btn btn-success" onClick={handlePut}>
                        Save
                      </button>
                    </div>
                  </h4>
                  <hr />
                  <div className="Pagecontent ms-4">
                    <input type="text" name="title" value={formData.title} onChange={handleChange}  className="form-control mb-3" />
                    <JoditEditor ref={editor} value={formData.content} config={config} onChange={handleContentChange} />
                  </div>
                </div>
              ) : (
                <>
                  <h4 className="ms-4 mt-4">
                    Title: {pkData.note_title}
                    <div className="mt-2">
                      <button className="ms-1 Deletebtn" onClick={() => DeleteData(pkData.id)}>
                        <i className="ri-delete-bin-line"></i>
                      </button>
                      <button className="ms-1 Deletebtn" onClick={handleEdit}>
                        <i className="ri-edit-2-line"></i>
                      </button>
                    </div>
                  </h4>
                  <hr />
                  <div className="Pagecontent ms-4" dangerouslySetInnerHTML={{ __html: pkData.note_content }}></div>
                </>
              )}
            </div>
          </div>
          <div className="cross-btn">
            <button  onClick={() => { setflag(false) 
            setEditMode(false)
              }}>
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default NotesPages;