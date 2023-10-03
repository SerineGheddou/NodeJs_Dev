export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text
}){
    return(
        <>
        {
            type==='Button' ?
            <button
                type={action}
                className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none  focus:ring-yellow-400 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                onClick={handleSubmit}
            >
                {text}
            </button>
            :
            <></>
        }
        </>
    )
}