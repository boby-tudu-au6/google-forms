import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography:{
        fontFamily: 'Poppins, sans-serif'
    },
    components: {
        MuiTextField: {
            defaultProps: {
                margin: "normal",
                fullWidth:true,
                // size:'small'
            }
        },
        MuiButton: {
            defaultProps: {
                variant: "contained"
            }
        }
    }
});

export default theme;