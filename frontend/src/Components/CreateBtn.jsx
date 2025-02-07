import React, { useState } from 'react'
import './CreateBtn.css';
import { Link } from 'react-router-dom';
 
const CreateBtn = () => {
    const[flag,setflag]=useState(false);
    
    const MouseIN=()=>{
        setflag(true)
    }
    const MouseOut=()=>{
        setflag(false);
    }

    return (
        <div className='Create'>
            <div className='btn-Container col-md-11'>
                <div className='btn me-2'>
                    <button className='Main-btn' onMouseEnter={MouseIN} onMouseLeave={MouseOut}><span>+</span></button>
                </div>

            </div>
            {flag && <div className={`Create-Menu ${flag? 'visible' : ''}`} onMouseEnter={MouseIN} onMouseLeave={MouseOut}>
                <Link to='/Createnotes'><button className='Create-Menu-btn'><i class="ri-sticky-note-line" ></i></button></Link>
                 <br></br>
                 <Link to='/Createtodos'><button className='Create-Menu-btn'><i class="ri-file-list-2-fill" ></i></button></Link>
            </div>}
        </div>
    )
}

export default CreateBtn
