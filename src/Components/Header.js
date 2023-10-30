import React from 'react';
import './Header.css'
import Shortify from '../Assets/Shortify.svg'
import { Link, useNavigate } from 'react-router-dom';
import { clearStorage, getuserName } from '../Utils/LocalStorage';

const Header = () => {
    const userName = getuserName()
    const navigate = useNavigate()

    const logOut = () => {
        clearStorage()
        navigate("/")
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <div className='Header-logo-container'>
                        <img
                            src={Shortify}
                            alt=''
                        />
                    </div>
                </a>
                <form className="d-flex userName">
                    <div >Hello,</div>
                    <div>{userName}</div>
                </form>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={`/shortify/dashboard`}><a className="nav-link active" aria-current="page" href="#">Home</a></Link>
                        </li>
                    </ul>

                    <div style={{ cursor: "pointer" }} onClick={logOut}>
                        <b>LogOut</b>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header