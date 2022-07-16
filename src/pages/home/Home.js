import React from 'react'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: 'calc(100% - 90px)'
  }
})



function Home() {
  const classes = useStyles()
  const user = useSelector(state => state.user)
  console.log(user);
  return (
    <div className={classes.root}>
      <Typography variant="h1">W E L C O M E</Typography>
      <Typography variant="h2">{user.name}</Typography>
      <Typography variant="h5" sx={{ color: 'gray' }}>{user.email}</Typography>
      <Typography variant="h5" sx={{ color: 'gray' }}>{user.designation}</Typography>
    </div>
  )
}

export default Home