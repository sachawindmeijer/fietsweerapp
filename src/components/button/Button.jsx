function Button({type, onClick, text, className, disabled, children}) {
    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
            disabled={disabled}>
        {children ||text}
        </button>
    )
}

export default Button;