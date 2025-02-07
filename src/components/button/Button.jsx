function Button({type, onClick, text, className, disabled}) {
    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
            disabled={disabled}>
        {text}
        </button>
    )
}

export default Button;