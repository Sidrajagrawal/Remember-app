import React, { useEffect, useState } from 'react';
import './Recent.css';

const Recent = ({ title, data }) => {
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    const reversedData = [...data].reverse().slice(0, 4);
    setDisplayData(reversedData);
  }, [data]);

  const htmlToText = (html) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  const cleanTodoContent = (content) => {
    return content.replace(/^,/, '');
  };

  return (
    <div className='Recent-Container col-md-10 mt-4 ms-4'>
      <div className="Maintitle ms-2 mt-2">
        <h3>{title}</h3>
      </div>

      <div className="Recentcard">
        {displayData.length > 0 ? (
          displayData.map((item) => (
            <div className="card ms-4" style={{ width: "18rem" }} key={item.id}>
              <div className="card-body">
                <h5 className="card-title">{item.note_title || item.todo_title}</h5>
                <p className="card-text">
                  {htmlToText(item.note_content || '').slice(0, 100)}
                </p>
                {item.todo_content && (
                  <ul>
                    {cleanTodoContent(item.todo_content).split(',').slice(0, 3).map((i, index) => (
                      <li key={index}>{i.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No recent {title.toLowerCase()} available.</p>
        )}
      </div>
    </div>
  );
};

export default Recent;
