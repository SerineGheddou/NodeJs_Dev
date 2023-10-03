const fixedInputClass="rounded-full appearance-none relative block w-200 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-900 focus:border-orange-500 focus:z-10 sm:text-sm"
 
export default function Input({
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    type,
    isRequired=false,
    placeholder,
    customClass
}){
    return(
        <div className="my-1">
            <label htmlFor={labelFor} className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue">
                {labelText}
            </label>
            <input
             onChange={handleChange}
             value={value}
             id={id}
             type={type}
             required={isRequired}
             className={fixedInputClass}
             placeholder={placeholder}
            />

        </div>
    )
}
                                                                                                             