import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams, Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormGenerator } from 'components'
import axios from 'axios'
import { Paper, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useDispatch } from 'react-redux'
import { openSnack } from 'store/reducers/snack.slice'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: "column",
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        textAlign: 'center'
    }
})


const validationSchema = yup.object({
    name: yup.string().min(3, 'min 3 char required').required("name is required"),
    email: yup.string().email("should be valid email").required("email is required"),
    phone: yup.string().min(10, 'min 10 char required').max(10, 'max 10 char allowed').required("phone is required"),
    designation: yup.string().required("designation is required"),
    experience_year: yup.string().required("experience is required")
})

export default function Forms() {
    const classes = useStyles()
    const params = useParams()
    const dispatch = useDispatch()
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            designation: "",
            experience_year: ""
        },
        resolver: yupResolver(validationSchema)
    })
    const onSubmit = async (values) => {
        try {
            const { data } = await axios.post('/form', { ...values, user: params.user })
            if (data) dispatch(openSnack({ type: "success", text: "Form Submitted successfully" }))
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className={classes.root}>
            <Paper elevation={1} sx={{ width: { xs: '100%', md: 500 }, p: 3, m: 'auto', textAlign: 'center' }}>
                <Typography variant="h3">Survey Form</Typography>
                <br />
                <FormGenerator
                    control={control}
                    child={[
                        { name: "name", label: "Name", type: 'text', gridProps: { xs: 12 } },
                        { name: "email", label: "Email", type: 'text', gridProps: { xs: 12 } },
                        { name: "phone", label: "Phone", type: 'number', gridProps: { xs: 12 } },
                        { name: "designation", label: "Designation", type: 'text', gridProps: { xs: 12 } },
                        { name: "experience_year", label: "Year of experience", type: 'number', gridProps: { xs: 12 } },
                    ]}
                />
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                <br />
                <br />
                <Typography variant="h6" component={Link} to="/">Go to Home page</Typography>
            </Paper>
        </div>
    )
}
