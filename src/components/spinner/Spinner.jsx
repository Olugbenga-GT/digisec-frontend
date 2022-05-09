import classes from './Spiner.module.css'
import React from 'react'

function Spinner() {
  return (
    <div className={classes.spinner}>
          <div className={classes.spinnerContainer}>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
          </div>
    </div>
  )
}

export default Spinner