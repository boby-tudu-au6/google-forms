import React from 'react'
import { FormGenerator } from 'components'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Paper, Button, Typography } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { registerUser } from 'api'

const validationSchema = yup.object({
  name: yup.string().min(3, 'min 3 char required').required("name is required"),
  email: yup.string().email("should be perfect email").required("email is required"),
  password: yup.string().min(3, 'min 3 char required').required("password is required"),
})

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 'calc(100% - 90px)',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: "column",
    textAlign: 'center'
  }
})

function Register() {
  const classes = useStyles()
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema)
  })
  const onSubmit = async (values) => {
    try {
      await registerUser(values)
      reset({
        name: "",
        email: "",
        password: "",
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className={classes.root}>
      <Paper elevation={1} sx={{ width: { xs: '100%', md: 500 }, p: 3, m: "auto" }}>
        <Typography variant="h3">Register</Typography>
        <br />
        <FormGenerator
          control={control}
          child={[
            { name: "name", label: "Name", type: 'text', gridProps: { xs: 12 } },
            { name: "email", label: "Email", type: 'text', gridProps: { xs: 12 } },
            { name: "password", label: "Password", type: 'password', gridProps: { xs: 12 } },
          ]}
        />
        <br />
        <Button onClick={handleSubmit(onSubmit)} fullWidth>Register</Button>
        <br />
        <br />
        <Typography variant="h6" component={Link} to="/login">Already registered? Click here.</Typography>
      </Paper>
    </div>
  )
}

export default Register