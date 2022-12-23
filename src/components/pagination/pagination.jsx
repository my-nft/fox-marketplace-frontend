const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  return (
    <>
      {pages !== 1 && (
        <div className="paginationWrapper">
          <p
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`paginationAction ${
              currentPage === 1 ? "paginationHide" : null
            }`}
          >
            Previous
          </p>

          <div className="paginationPagesWrapper">
            <p
              className={`paginationPage ${
                currentPage === 1 ? "paginationPageActive" : null
              }`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </p>
            {pages > 6 && currentPage > 4 && (
              <p className="paginationPage">...</p>
            )}

            {pages &&
              Array.from(Array(pages).keys()).map((item, index) => {
                // render max 5 items
                if (currentPage < 5) {
                  if (index < 5 && index > 0 && index < pages - 1) {
                    return (
                      <p
                        className={`paginationPage ${
                          currentPage === index + 1
                            ? "paginationPageActive"
                            : null
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                        key={index}
                      >
                        {index + 1}
                      </p>
                    );
                  }
                } else if (currentPage > pages - 4) {
                  if (index > pages - 6 && index > 0 && index < pages - 1) {
                    return (
                      <p
                        className={`paginationPage ${
                          currentPage === index + 1
                            ? "paginationPageActive"
                            : null
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                        key={index}
                      >
                        {index + 1}
                      </p>
                    );
                  }
                } else {
                  if (
                    index > 0 &&
                    index < pages - 1 &&
                    index >= currentPage - 3 &&
                    index <= currentPage + 1
                  ) {
                    if (pages - index === 1) {
                      return;
                    }

                    return (
                      <p
                        className={`paginationPage ${
                          currentPage === index + 1
                            ? "paginationPageActive"
                            : null
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                        key={index}
                      >
                        {index + 1}
                      </p>
                    );
                  }
                }
              })}
            {pages > 6 && currentPage < pages - 2 && (
              <p className="paginationPage">...</p>
            )}
            <p
              className={`paginationPage ${
                currentPage === pages ? "paginationPageActive" : null
              }`}
              onClick={() => setCurrentPage(pages)}
            >
              {pages}
            </p>
          </div>
          <p
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`paginationAction ${
              currentPage === pages ? "paginationHide" : null
            }`}
          >
            Next
          </p>
        </div>
      )}
    </>
  );
};

export default Pagination;
