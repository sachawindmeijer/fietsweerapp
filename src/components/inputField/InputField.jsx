function InputField({type, id, name, placeholder, value, onChange, onKeyUp, register}) {
    return (
        <input
            type={type}
            id={id}               // Ensure the input field has an id
            name={name}           // Ensure the input field has a name
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}
            {...register && register} // if you're using react-hook-form

        />
    );
}


export default InputField;