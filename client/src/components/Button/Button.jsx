import './index.scss';


const Button = ({ onClick, disabled, type, text, showGoogleIcon, marginTop }) => {

    const buttonStyle = {
        marginTop : marginTop 
    };

    return (
        <button style={buttonStyle} className='auth-button' onClick={onClick} disabled={disabled} type={type}>

            {showGoogleIcon && (
                <span className='auth-button__icon-google'>
                    <svg viewBox="0 0 16 15" fill="none">
                        <path d="M15.19 7.491c0-.533-.048-1.043-.138-1.533h-6.9v2.81h3.974a3.379 3.379 0 01-1.474 2.264v1.823h2.365c1.381-1.27 2.173-3.146 2.173-5.364z" />
                        <path d="M10.652 11.032c-.658.441-1.505.7-2.497.7-1.916 0-3.542-1.283-4.124-3.012h-2.44v1.88a7.35 7.35 0 006.564 4.018c1.983 0 3.65-.647 4.862-1.763l-2.365-1.823z" />
                        <path d="M3.801 7.325c0-.485.082-.954.23-1.395V4.05h-2.44a7.217 7.217 0 00-.78 3.275c0 1.179.281 2.29.78 3.275l2.44-1.88a4.366 4.366 0 01-.23-1.395z" />
                        <path d="M8.155 2.919c1.082 0 2.052.37 2.818 1.094l2.096-2.08C11.796.755 10.136.033 8.155.033A7.351 7.351 0 001.59 4.05l2.44 1.88C4.613 4.2 6.24 2.919 8.155 2.919z" />
                    </svg>
                </span>
            )}

            <p className='auth-button__text'>{text}</p>
            
        </button>
    );
};

export default Button;
