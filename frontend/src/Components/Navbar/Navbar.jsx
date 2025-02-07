import React from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom'
 
const Navbar = () => {
    return (
        <div className='col=md-12 nav-Conatainer' >
            <div className="logo col-md-2">
                <img src={require('./Logo.png')} alt="Logo" />
                <h2 className='title '>Listo</h2>
                <div className='line-1'></div>
            </div>
            <div className="right col-md-4">
                <ul className='menu py-3 px-0'>
                    <Link to='/'><li>Home</li></Link>
                    <Link to='/notes'><li>Notes</li></Link>
                    <Link to='/todos'><li>Todo</li></Link>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
