
const Pagination = ({
    pages,
    currentPage,
    setCurrentPage,
}) => {
    return <>
        {
            pages !== 1 &&
            <div className="paginationWrapper">
            <p onClick={() => setCurrentPage(currentPage - 1)} className={`paginationAction ${currentPage === 1 ? 'paginationHide' : null}`}>Previous</p>
            <div className="paginationPagesWrapper">
                {
                pages && Array.from(Array(pages).keys()).map((item, index) => {
                    return (
                    <p
                        className={`paginationPage ${currentPage === index + 1 ? 'paginationPageActive' : null}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </p>
                    )
                })
                }
            </div>
            <p onClick={() => setCurrentPage(currentPage + 1)} className={`paginationAction ${currentPage === pages ? 'paginationHide' : null}`}>Next</p>
            </div>
        }
    </>
}

export default Pagination;