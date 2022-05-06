import React from 'react'
import { Link , NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/digisecLogo.svg'
import classes from './Navbar.module.css'
import { useSelector , useDispatch } from 'react-redux';
import { logout , reset  } from '../../store/auth/authSlice';



const Navbar = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth)

  // const location = useLocation();

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <nav className={classes.navbar}>
        <Link  to='/'>
            <img  src = {logo} alt="Digisec  Logo"/>
        </Link>
        <ul>
            {user === null   ? 
            <li>
              <NavLink to='/' onClick={onLogout}>
                Log out
            </NavLink> 
        </li>
            :
            <li>
                <NavLink to='/signin'>
                  Log in
              </NavLink> 
            </li>
            }
        </ul>
    </nav>
  )
}

export default Navbar