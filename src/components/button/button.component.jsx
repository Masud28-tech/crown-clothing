import './button.styles.scss';

/*
type-1 : default 

type-2 : inverted 

type-3 : google sign in 
*/

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({ children, buttonType, ...otherOptions}) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherOptions}>
            {children}
        </button>
    );
}

export default Button;