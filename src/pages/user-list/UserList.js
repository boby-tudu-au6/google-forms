import { Button, Container } from '@mui/material'
import { getAllFormOfUser } from 'api'
import { MuiTable } from 'components'
import React, { useEffect, useState, } from 'react'
import { CSVLink } from "react-csv";
import { useParams } from 'react-router-dom'
import { Icon } from '@iconify/react';

export default function UserList() {
    const [data, setData] = useState([])
    const params = useParams()
    const getuserlist = async () => {
        try {
            const list = await getAllFormOfUser(params.id)
            if (list && list.data) setData(list.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    const headers = [
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Designation", key: "designation" },
        { label: "Phone", key: "phone" },
        { label: "Year of experience", key: "experience_year" }
    ];
    useEffect(() => {
        getuserlist()
    }, [])
    return (
        <div>
            <Container maxWidth="md">
                <CSVLink
                    data={data}
                    headers={headers}
                    filename={"users.csv"}
                >

                    <Button endIcon={<Icon icon="ri:file-excel-2-line" />}>Export as CSV</Button>
                    <br />
                    <br />
                </CSVLink>
                <MuiTable data={data} />
            </Container>
        </div>
    )
}
