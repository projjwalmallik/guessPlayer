import PropTypes from 'prop-types';

const KeyBoard = ({ onKeyPress }) => {
    const keyboardLayout = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Del',],
        ['Hint', 'Space', 'Guess']
    ];
    return (
        <div className="keyboard">
            {keyboardLayout.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((key, keyIndex) => (
                        <button
                            key={keyIndex}
                            onClick={() => onKeyPress(key)}
                            className={key === "Space" ? "space-key" :
                            key === "Guess" ? "guess-key" :
                            key === "Del" ? "del-key" :
                            key === "Hint" ? "hint-key" :
                            ""}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};

KeyBoard.propTypes = {
    onKeyPress: PropTypes.func.isRequired
};

export default KeyBoard;
