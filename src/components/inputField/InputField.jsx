import React from "react";

const InputField = React.forwardRef((
    { type, id, name, placeholder, value,  register, ...rest }, ref) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            ref={ref}
            {...(register ? register : {})}
            {...rest}
        />
    );
});



export default InputField;

