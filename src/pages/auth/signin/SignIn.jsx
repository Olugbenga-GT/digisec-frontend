import React  , {useState , useEffect, useRef} from 'react'
import {Stack } from '@mui/material'
import { Link } from 'react-router-dom';
import classes from './SignIn.module.css'
import key from '../../../assets/key.png'
import logo from '../../../assets/digisecLogo.svg'
import Input from '../../../UI/input/Input';
import {MdMailOutline, MdVisibilityOff , MdVisibility} from "react-icons/md";
import {FaHandHoldingHeart} from "react-icons/fa";
import { useDispatch , useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../../../store/auth/authSlice'
// import Spinner from '../../../components/spinnner/Spinner'
import Spinner from '../../../components/spinner/Spinner'



function SignIn() {
    let iconStyles = { 
        color: "rgba(247, 116, 60, .85)", 
        fontSize: "2rem" , 
        position: 'absolute',
        right:'2rem',
        top: '2.3rem',  
        cursor:'pointer'
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user , isLoading , isError , isSuccess , message} = useSelector( (state) => state.auth)

    const emailRef = useRef();
    const passwordRef = useRef();

    const[showPassword , setShowPassword] = useState(false)
    const togglePasswordVisibility =  () => {setShowPassword(!showPassword)}

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user) {
            navigate('/ ')
        }
        dispatch(reset( ))


    }, [user , isLoading , isError , isSuccess , message , navigate , dispatch])

    function submitHandler(e){
        e.preventDefault();
        const userData = {
            email : emailRef.current.value,
            password : passwordRef.current.value
        }
 
        dispatch(login(userData))
    }
    if(isLoading){
        return <Spinner/>
    }

  return (
    <section className ={classes.signin}>
        <div className={classes.signinLeft} >
            <Link  to='/'>
                <img  src = {logo} alt="Digisec  Logo" className={classes.logo}/>
            </Link>
            <Stack>
                <img src={key} alt="Digisec Logo"  className={classes.key}/>
                <span>
                    <p>Your safety, Our priority</p>
                    <FaHandHoldingHeart  color='#f6743c' />
                </span>
            </Stack>
        </div>
        <div className={classes.signinRight} >
            <h3>Sign In</h3>
            <form    className = {classes.form} onSubmit = {submitHandler} >

                <div>
                    <Input  
                    ref={emailRef}
                    label ='Email'
                    input ={{type: 'email'}}/>
                    <MdMailOutline style={iconStyles} />
                </div>

                <div>
                    <Input  
                        ref={passwordRef}
                        label ='Password'
                        input ={showPassword ?{type: 'text'} : {type : 'password'}}
                    />
                    <span onClick={togglePasswordVisibility}>
                    { showPassword ?  <MdVisibility style={iconStyles} /> : <MdVisibilityOff style={iconStyles} /> }
                    </span>
                </div>

                <span className={classes.reroute}>
                    <small>Don't have an account ? </small>
                    <Link to='/signup' >&nbsp;  Register  </Link>
                </span>
                <button className='signin-btn'>Log In</button>

            </form >
        </div>
    </section>
  )
}

export default SignIn