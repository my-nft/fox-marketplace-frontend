
const Spinner = ({children}) => {
    return(
        <div className="loader">
            <img src="/assets/images/Logo_fox.png" alt="Loading..." />
            <div>{children}</div>
        </div>
    )
}

export default Spinner