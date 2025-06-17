import React, { useContext } from 'react';
import FeedbackForm from './FeedbackForm'
import { LightThemeContext } from '../contexts/ThemeContext';

function InputArea({
    input,
    setInput,
    handleSendMessage,
    handleFeedbackModal,
    setShowFeedbackModal,
    showFeedbackModal,
    rating,
    comment,
    setRating,
    setComment,
    saveFeedback,
}) {
    const { lightTheme } = useContext(LightThemeContext)

    return (
        <div className="input-area">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ background: !lightTheme && '#240b4a', border: !lightTheme && '2px solid magenta', color: !lightTheme && 'white' }}
            />
            <button onClick={handleSendMessage} style={{ background: !lightTheme && 'magenta', color: !lightTheme && 'white' }}>
                Ask
            </button>
            <button onClick={handleFeedbackModal} style={{ background: !lightTheme && 'magenta', color: !lightTheme && 'white' }}>
                Save
            </button>

            {showFeedbackModal && (
                <FeedbackForm
                    setOpen={setShowFeedbackModal}
                    open={showFeedbackModal}
                    rating={rating}
                    comment={comment}
                    setRating={setRating}
                    setComment={setComment}
                    saveFeedback={saveFeedback}
                />
            )}
        </div>
    );
};

export default InputArea;
