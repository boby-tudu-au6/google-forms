import React, { useEffect, useState } from 'react'
import { FormGenerator } from 'components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Paper, Typography, Button } from '@mui/material'
import { resetPassword } from 'api'
import { makeStyles } from '@mui/styles'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { openSnack } from 'store/reducers/snack.slice'

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 'calc(100% - 90px)',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center'
    },
})

const validationSchema = yup.object({
    newPassword: yup.string().min(3, 'should be min 3 char').required("this field is required"),
    passwordConfirmation: yup.string().required("this field is required").oneOf([yup.ref('newPassword')], 'Passwords does not match'),
})

function ResetPassword() {
    const classes = useStyles()
    const params = useParams()
    const dispatch = useDispatch()
    const [invalid, setinValid] = useState(true)

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            newPassword: "",
            passwordConfirmation: ""
        },
        resolver: yupResolver(validationSchema)
    })
    const onSubmit = async (values) => {
        try {
            resetPassword(values, params.token)
            dispatch(openSnack({ type: "success", text: "password updated successfully" }))
            reset({
                newPassword: "",
                passwordConfirmation: ""
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                await axios.post('/user/verify-token', { token: params.token })
            } catch (error) {
                setinValid(false)
                console.log(error.message)
            }
        })()
    }, [params])

    return (
        <div className={classes.root}>
            {!invalid && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: "column",
                    textAlign: 'center',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.7)',
                    zIndex: 1000000
                }}>
                    <Typography variant="h2" sx={{ fontWeight: 800, color: 'white' }}>Invalid Link</Typography>
                </div>
            )}
            <Paper elevation={1} sx={{ width: { xs: '100%', md: 500 }, p: 3, m: 'auto', textAlign: 'center' }}>
                <FormGenerator control={control} child={[
                    { type: "password", name: "newPassword", label: "Password", gridProps: { xs: 12 } },
                    { type: "text", name: "passwordConfirmation", label: "Re enter Password", gridProps: { xs: 12 } },
                ]} />
                <Button onClick={handleSubmit(onSubmit)} >Submit</Button>
                <br />
                <br />
                <Typography variant="h6" component={Link} to="/login">Click here for Login.</Typography>
            </Paper>
        </div>
    )
}

export default ResetPassword