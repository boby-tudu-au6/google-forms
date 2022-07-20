import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Balcony, ExitToApp, } from '@mui/icons-material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/reducers/user.slice';


function Layout() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [showList, setShowList] = React.useState(false)
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    React.useEffect(() => {
        if (pathname.split('/')[1] !== 'forms') setShowList(true)
        else setShowList(false)
    }, [pathname]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                elevation={3}
                color='primary'
                sx={{ zIndex: 'tooptip' }}
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
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                            flexGrow: 1
                        }}
                    >
                        Google forms clone
                    </Typography>
                    <Button sx={{ color: 'white' }} variant="text" onClick={() => navigate(`/`)}>
                        Home
                    </Button>
                    {
                        user && showList && (
                            <Button sx={{ color: 'white' }} variant="text" onClick={() => navigate(`/user-list/${user._id}`)}>
                                User list
                            </Button>
                        )
                    }
                    {user && showList && (
                        <div style={{ display: 'flex' }}>
                            <Button variant="text" sx={{ color: "white" }} endIcon={<ExitToApp />} onClick={() => dispatch(logout())}>Logout</Button>
                            <Avatar sx={{ bgcolor: "white", color: 'black', ml: 3 }}>{user.name[0]}</Avatar>
                            {/* <Typography sx={{ p: 2 }} variant="h6">{user.name.split(' ')[0]}</Typography> */}
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
