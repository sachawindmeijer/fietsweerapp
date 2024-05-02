function InputField({type, id, register, placeholder, value, onChange}) {
    return (
        <input
            type={type}
            id={id}
            {...register(id)}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}


export default InputField;