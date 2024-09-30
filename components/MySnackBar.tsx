import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface SnackInfo {
  openSnack: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface MySnackBarProps {
  setSnackInfo: React.Dispatch<React.SetStateAction<SnackInfo>>;
  snackInfo: SnackInfo;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MySnackBar: React.FC<any> = ({ setSnackInfo, snackInfo }) => {
  const handleSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackInfo((prev:any) => ({ ...prev, openSnack: false }));
  };

  return (
    <Snackbar
      open={snackInfo.openSnack}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={6000}
      onClose={handleSnackClose}
    >
      <Alert onClose={handleSnackClose} severity={snackInfo.type} sx={{ width: '100%' }}>
        {snackInfo.message}
      </Alert>
    </Snackbar>
  );
};

export default MySnackBar;
