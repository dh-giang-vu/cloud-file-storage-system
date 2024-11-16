import { Button, CircularProgress } from '@mui/material';

function LoadingButton(props) {
  const { loading, additionalStyles, ...other } = props;

  return (
    <Button
      disabled={loading}
      {...other}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...additionalStyles
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : props.children}
    </Button>
  );
}

export default LoadingButton;
