import React from "react";

const InputField = React.forwardRef(({ type, id, name, placeholder, value, onChange, onKeyUp, register, ...rest }, ref) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}
            ref={ref}  // Forward the ref
            {...(register ? register : {})}
            {...rest}
        />
    );
});


// function InputField({type, id, name, placeholder, value, onChange, onKeyUp, register}) {
//     return (
//         <input
//             type={type}
//             id={id}               // Ensure the input field has an id
//             name={name}           // Ensure the input field has a name
//             placeholder={placeholder}
//             value={value}
//             onChange={onChange}
//             onKeyUp={onKeyUp}
//             {...register && register} // if you're using react-hook-form
//
//         />
//     );
// }


export default InputField;

