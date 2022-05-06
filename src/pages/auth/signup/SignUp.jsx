import React  , { useEffect , useState} from 'react'
import {Stack } from '@mui/material'
import { Link } from 'react-router-dom';
import classes from './SignUp.module.css'
import key from '../../../assets/key.png'
import logo from '../../../assets/digisecLogo.svg'
import Input from '../../../UI/input/Input';
import { MdPerson , MdThumbUp, MdVisibilityOff , MdVisibility, MdPhoneIphone , MdMailOutline} from "react-icons/md";
import {useSelector , useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {reset , register} from '../../../store/auth/authSlice'
import Spinner from '../../../components/spinner/Spinner'


function SignUp() {
    let iconStyles = { 
        color: "rgba(247, 116, 60, .85)", 
        fontSize: "2rem" , 
        position: 'absolute',
        right:'2rem',
        top: '2.3rem',  
        cursor:'pointer'
    };

    const [userDetails , setUserDetails] = useState({
        firstName : '',
        lastName: '',
        email: '',
        address : "",
        telephone: '',
        password : '',
        confirmPassword: '',
    })
     
    const {firstName , lastName, email ,address, telephone , password , confirmPassword} = userDetails;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user , isLoading, isError , isSuccess, message} = useSelector((state) =>  state.auth)

    useEffect(() => {
        if(isError){ toast.error(message)}
        if(isSuccess || user ){ navigate('/')}

        dispatch(reset());

    } , [navigate , dispatch ,user ,isError , isSuccess, message])

    const userDetailsChangeHandler = (e) => {
        setUserDetails((prevState) => ({
            ...prevState ,
            [e.target.name] : e.target.value,
        }))
    }
    const[showPassword , setShowPassword] = useState(false)
    const[showConfirmPassword , setShowConfirmPassword] = useState(false)

    const togglePasswordVisibility =  () => {setShowPassword(!showPassword)}
    const toggleConfirmPasswordVisibility =  () => {setShowConfirmPassword(!showConfirmPassword)}

        function submitHandler(e){
            e.preventDefault()
            if(password !== confirmPassword){
                toast.error('password mismatch. Check again')
            }else {
                const userData = {
                    email : userDetails.email,
                    phone : userDetails.telephone, 
                    firstname : userDetails.firstName, 
                    lastname : userDetails.lastName, 
                    house_add : userDetails.address ,
                     password : userDetails.password,
                     password_1 : userDetails.confirmPassword
                }

                dispatch(register(userData))
                console.log(userData);
            }
        }
        if(isLoading){
            return <Spinner/>
        }
  return (
    <section className ={classes.signup}>
        <div className={classes.signupLeft} >
            <Link  to='/'>
                <img  src = {logo} alt="Digisec  Logo" className={classes.logo}/>
            </Link>
            <Stack>
                <img src={key} alt="Digisec Logo"  className={classes.key}/>
                <span>
                    <p>Welcome, rest assured  we have you covered</p>
                    <MdThumbUp  color='#f6743c' />
                </span>
            </Stack>
        </div>
        <div className={classes.signupRight} >
            {/* <h3>Register</h3> */}
            <form    className = {classes.form} onSubmit = {submitHandler} >
                <div>
                    <Input  
                    value = {firstName} 
                    onChange={userDetailsChangeHandler} 
                    label ='Firstname'
                    name ='firstName'
                    input ={{type: 'text'}}
                        />
                    <MdPerson style={iconStyles} />
                </div>
                <div>
                    <Input  
                    value = {lastName} 
                    onChange={userDetailsChangeHandler}
                    label ='Lastname'
                    name ='lastName'
                    input ={{type: 'text'}}
                    />
                    <MdPerson style={iconStyles} />
                </div>
                <div>
                    <Input  
                    value = {email} 
                    onChange={userDetailsChangeHandler}
                     label ='Email'
                     name ='email'
                    input ={{type: 'email'}}/>
                    <MdMailOutline style={iconStyles} />
                </div>
                <div>
                    <Input  
                    value = {address} 
                    onChange={userDetailsChangeHandler}
                     label ='Address'
                     name ='address'
                    input ={{type: 'text'}}/>
                    <MdMailOutline style={iconStyles} />
                </div>
                <div>
                    <Input  
                    value = {telephone} 
                    onChange={userDetailsChangeHandler}
                     label ='Telephone'
                     name='telephone'
                    input ={{type: 'tel'}}/>
                        <MdPhoneIphone style={iconStyles} />
                </div>
                <div>
                    <Input  
                    value = {password} 
                    onChange={userDetailsChangeHandler}
                     label ='Password'
                     name ='password'
                    input ={showPassword ?{type: 'text'} : {type : 'password'}}
                        />
                        <span onClick={togglePasswordVisibility}>
                        { showPassword ?  <MdVisibility style={iconStyles} /> : <MdVisibilityOff style={iconStyles} /> }
                        </span>
                </div>
                <div>
                    <Input  
                    value = {confirmPassword}  
                    onChange={userDetailsChangeHandler} 
                    label ='Confirm Password'
                    name ='confirmPassword'
                    input ={showConfirmPassword ?{type: 'text'} : {type : 'password'}}
                    />
                    <span onClick={toggleConfirmPasswordVisibility}>
                        { showConfirmPassword ?   <MdVisibility style={iconStyles} /> : <MdVisibilityOff style={iconStyles} /> 
                        }
                    </span>
                </div>
                <span className={classes.reroute}>
                    <small>Already have an account ? </small>
                    <Link to='/signin' >&nbsp;  Log in </Link>
                </span>
                <button className='signin-btn'>Register</button>

            </form >
        </div>
    </section>
  )
}

export default SignUp