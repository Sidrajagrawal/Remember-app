import React, { useEffect, useState } from 'react';
import Recent from './Recent/Recent';
import axios from 'axios';

const Home = () => {
  const [noteFetchData, setNoteFetchData] = useState([]);
  const [todoFetchData, setTodoFetchData] = useState([]);

  const fetchData = async (url, setData) => {
    try {
      const response = await axios.get(url);
      setData(response.data || []);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData("http://127.0.0.1:8000/note/detail/", setNoteFetchData);
    fetchData("http://127.0.0.1:8000/todo/detail/", setTodoFetchData);
  }, []);

  return (
    <div>
      <Recent title={'Recent Notes'} data={noteFetchData} />
      <Recent title={'Recent Todos'} data={todoFetchData} />
    </div>
  );
};

export default Home;