import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar/Navbar';
import CreateBtn from './Components/CreateBtn';
import NotesPages from './Components/Notes/NotesPages';
import CreateNotes from './Components/Notes/CreateNotes'
import TodoPage from './Components/Todo/TodoPage';
import CreateTodos from './Components/Todo/CreateTodos';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className=''>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/notes' element={<NotesPages/>}></Route>
          <Route path='/Createnotes' element={<CreateNotes/>}></Route>
          <Route path='/todos' element={<TodoPage/>}></Route>
          <Route path='/Createtodos' element={<CreateTodos/>}></Route>
        </Routes>

        <CreateBtn/>
      </BrowserRouter>

    </div>
  );
}

export default App;
