import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Balcony, ExitToApp, } from '@mui/icons-material'
// import { DrawerComponent } from 'components';
import { Icon } from '@iconify/react';
import { Outlet } from 'react-router-dom';
import { Button, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/reducers/user.slice';
import { getAllUsers } from 'api';
import { CSVLink } from "react-csv";




function Layout() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [data, setData] = React.useState([])
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const dispatch = useDispatch()
    const link = React.useRef()
    const user = useSelector(state => state.user)
    const headers = [
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Designation", key: "designation" },
        { label: "DOB", key: "age" }
    ];
    const getuserlist = async () => {
        try {
            const list = await getAllUsers()
            if (list && list.data) setData(list.data)
            setTimeout(() => link.current.link.click(), 700)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                elevation={3}
                // position="fixed"
                sx={{
                    background: 'black',
                    zIndex: 'tooptip'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Balcony sx={{ display: 'flex', mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            // fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                            flexGrow: 1
                        }}
                    >
                        Google forms clone
                    </Typography>
                    <CSVLink
                        ref={link}
                        data={data}
                        headers={headers}
                        filename={"users.csv"}
                    >

                    </CSVLink>
                    <Tooltip title="Download user list in csv file">
                        <IconButton onClick={getuserlist}>
                            <Icon icon="vscode-icons:file-type-excel" />
                        </IconButton>
                    </Tooltip>
                    {user && (
                        <div style={{ display: 'flex' }}>
                            <Typography sx={{ p: 2 }} variant="h6">{user.name}</Typography>
                            <Button variant="text" sx={{ color: "white" }} endIcon={<ExitToApp />} onClick={() => dispatch(logout())}>Logout</Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    flexGrow: 1, p: 3, background: '#eeeeee',
                    height: 'auto', minHeight: '100vh'
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default Layout;
