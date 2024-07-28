function InlogField({type, id, register, placeholder}) {
    return (
        <input
            type={type}
            id={id}
            {...register(id)}
            placeholder={placeholder}


        />
    )
}


export default InlogField;