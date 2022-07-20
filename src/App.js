import './App.css';
import { Loader, Snackbar } from 'components'
import theme from 'theme';
import { ThemeProvider } from '@mui/material'
import { UserRoutes, AuthRoutes } from 'routes'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from 'store/reducers/user.slice';
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react';

function App() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('user')
    if (token) dispatch(setUser(jwtDecode(token)))
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Snackbar />
      <Loader />
      {user ? <UserRoutes /> : <AuthRoutes />}
    </ThemeProvider>
  );
}

export default App;

