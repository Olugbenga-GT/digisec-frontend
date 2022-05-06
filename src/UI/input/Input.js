import React  from 'react'
import classes from './Input.module.css'


const  Input = React.forwardRef((props , ref) => {
       return ( 
              <div className = {classes.input}>
                     <label htmlFor={ props.input.name}>{props.label}</label>
                     <input ref = {ref}  {...props.input}  id = {props.input.id} 
                     value= {props.value}
                     name = {props.name}
                      onChange = {props.onChange}  />
                     {/* {...props.input }  <<< Spreading the input props like this ensures that all the props that will be included for the input, will be added*/}
              </div>
       )
})

export default Input