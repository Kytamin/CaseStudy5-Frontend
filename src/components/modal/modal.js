import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Login from "../pages/Login";
import Register from '../pages/Register';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid gray',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const handleClose = () => props.setOpen(false);
  const [login, setLogin] = React.useState(true);

  React.useEffect(() => {
    console.log(1);
  }, [login])

  
  

  return (
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {login ? <Login setLogin={setLogin}/> : <Register setLogin={(e) => setLogin(e)}/>}
          </Typography>
        </Box>
      </Modal>
  );
}