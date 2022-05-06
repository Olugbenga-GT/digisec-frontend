import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
import classes from './Hero.module.css'
import React from 'react'
import key from '../../assets/key.png'

const Hero = () => {
  return (
    <Grid container rowSpacing={{md : 3}} className ={classes.hero}>
        <Grid item md ={8} xs ={12} className={classes.heroText}>
            <p className={classes.headerText}> Your trusted indoor and outdoor security partner, always.</p>
            <p className={classes.smallText}>
                Our mission is simple. We maximize your success by keeping your best interest ventral to everything we do. We partner with you to see the big picture, leveraging your information to create and share strategies that ensure best security for us.
            </p>
            <Link to  = '/signup'>
                Get Started
            </ Link>
        </Grid>

        <Grid item md ={4} xs ={12}  className={classes.heroImg} >
                <img src={key} alt="" />
        </Grid>
    </Grid>

  )
}

export default Hero