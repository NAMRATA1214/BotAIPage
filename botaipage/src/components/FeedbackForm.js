import { Box, Modal, Backdrop, Rating } from '@mui/material';
import React, { useContext } from 'react';
import { LightThemeContext } from '../contexts/ThemeContext';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 766,
  height: 335,
  bgcolor: '#FAF7FF',
  border: 'none',
  boxShadow: '-4px 4px 10px 0px #00000040',
  borderRadius: 3,
  p: 4,
};

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 766,
  height: 335,
  bgcolor: '#310E68',
  border: 'none',
  boxShadow: '-4px 4px 10px 0px #00000040',
  borderRadius: 3,
  p: 4,
};


const FeedbackForm = ({ open, setOpen, rating, setRating, comment, setComment, saveFeedback }) => {

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    saveFeedback()
    setRating(0);
    setComment('');
    handleClose()
  };

  const { lightTheme } = useContext(LightThemeContext)
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="feedback-form"
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(2px)',
          },
        },
      }}
    >
      <Box sx={lightTheme ? style : style2}>
        <div className='feedback-form' style={{ background: !lightTheme && '#310E68', color: !lightTheme && 'white' }}>
          <div className='feedback-header'>
            {lightTheme ? <img src="/images/feedback-logo.svg" alt="logo" className='logo' /> :
              <WbIncandescentIcon className='logo' style={{ transform: 'rotate(180deg)', color: 'white' }}/>}
            <span>
              Provide Additional Feedback
            </span>
            {lightTheme ? <img src="/images/feedback-close-button.svg" alt="close-button" className='close-button' onClick={handleClose} /> :
              <span className='close-button' onClick={handleClose} styel={{ color: 'white' }}>X</span>}
          </div>
          <div className='feedback-rating'>
            <Rating
              name="simple-controlled"
              value={Number(rating)}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
          <textarea className='feedback-message' value={comment}
            onChange={(e) => setComment(e.target.value)} style={{ background: !lightTheme && '#401d78', color: !lightTheme && 'white' }} />
          <div className='feedback-submit'>
            <button onClick={handleSubmit} style={{ background: !lightTheme && 'magenta', color: !lightTheme && 'white' }}>Submit</button>
          </div>


        </div>

      </Box>
    </Modal>
  );
};

export default FeedbackForm;
