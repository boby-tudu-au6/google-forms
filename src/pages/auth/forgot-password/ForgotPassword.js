import React, { useEffect, useState } from 'react'
import { FormGenerator } from 'components'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Paper, Typography, Button, Box } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { makeStyles } from '@mui/styles'
// import {  } from 'react-router-dom'
import { forgotPassword } from 'api'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { openSnack } from 'store/reducers/snack.slice'
import { clearToken } from 'store/reducers/password.slice'

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
const validationSchema = yup.object({
    email: yup.string().email("should be valid email").required("email is required")
})
function ForgotPassword() {
    const [link, setLink] = useState('')
    const classes = useStyles()
    const password = useSelector(state => state.password)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            email: ""
        },
        resolver: yupResolver(validationSchema)
    })
    useEffect(() => {
        setLink(`http://localhost:3000/reset-password/${password}`)
    }, [password])
    const onSubmit = async (values) => {
        try {
            await forgotPassword(values)
            reset({ email: "" })
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className={classes.root}>
            {password && (<Box sx={{ p: 2, width: { xs: '80%', sm: "60%", md: '50%' }, textAlign: 'center', m: 'auto', border: '1px solid', overflow: "hidden" }}>
                <Typography variant="h4">Password reset link</Typography>
                <input readOnly value={link} style={{ padding: 8 }} />
                <br />
                <br />
                <Button variant="outlined" onClick={() => {
                    navigator.clipboard.writeText(link)
                    dispatch(openSnack({ type: "success", text: "Url copied to Clipboard" }))
                    dispatch(clearToken())
                }}>Copy to Clipboard</Button>
            </Box>)}
            <Paper elevation={1} sx={{ width: { xs: '100%', md: 500 }, p: 3, m: "auto", textAlign: 'center' }}>
                <Typography variant="h3">Forgot Password</Typography>
                <br />
                <FormGenerator
                    control={control}
                    child={[{ type: "text", name: "email", label: "Email", gridProps: { xs: 12 } }]}
                />
                <Button onClick={handleSubmit(onSubmit)} fullWidth sx={{ mb: 1 }}>Submit</Button>
                <br />
                <Button onClick={() => navigate('/login')} fullWidth variant="outlined">Cancel</Button>
            </Paper>
        </div>
    )
}

export default ForgotPassword