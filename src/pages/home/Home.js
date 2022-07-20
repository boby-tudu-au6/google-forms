import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Typography, Button, Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { openSnack } from 'store/reducers/snack.slice'

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
  const dispatch = useDispatch()
  const [link, setLink] = useState('')
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user) setLink(`${window.location.origin}/forms/${user._id}`)
  }, [user])

  return (
    <div className={classes.root}>
      <Container maxWidth='md'>
        <Typography variant="h1">W E L C O M E</Typography>
        <Typography variant="h2">{user.name}</Typography>
        <Typography variant="h5" sx={{ color: 'gray' }}>{user.email}</Typography>
        <Typography variant="h5" sx={{ color: 'gray' }}>{user.designation}</Typography>
        <input readOnly value={link} style={{ padding: 8 }} />
        <br />
        <Button variant="outlined" onClick={() => {
          navigator.clipboard.writeText(link)
          dispatch(openSnack({ type: "success", text: "Url copied to Clipboard" }))
        }}>Copy to Clipboard</Button>
      </Container>
    </div>
  )
}

export default Home