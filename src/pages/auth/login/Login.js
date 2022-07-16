import React from 'react'
import { FormGenerator } from 'components'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Paper, Typography, Button } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { loginUser } from 'api'


const validationSchema = yup.object({
  email: yup.string().email('should be valid email').required("email is required"),
  password: yup.string().required("password is required")
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

function Login() {
  const classes = useStyles()
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = async (values) => {
    try {
      await loginUser(values)
      reset({
        email: "",
        password: ""
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className={classes.root}>
      <Paper elevation={1} sx={{ width: { xs: '100%', md: 500 }, p: 3, m: "auto", textAlign: 'center' }}>
        <Typography variant="h3">Login</Typography>
        <br />
        <Icon style={{ fontSize: 200 }} icon="arcticons:lock" />
        <FormGenerator
          control={control}
          child={[
            { name: "email", label: "Email", type: "text", gridProps: { xs: 12 } },
            { name: "password", label: "Password", type: "password", gridProps: { xs: 12 } },
          ]}
        />
        <br />
        <Button onClick={handleSubmit(onSubmit)} fullWidth>Login</Button>
        <br />
        <br />
        <Typography variant="h6" component={Link} to="/forgot-password">Forgot Password?</Typography>
        <br />
        <Typography variant="h6" component={Link} to="/register">Not registered? Click here.</Typography>
      </Paper>
    </div>
  )
}

export default Login