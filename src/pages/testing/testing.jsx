import { useState } from "react"
import Pagination from "../../components/pagination/pagination";

const TestingPage = () => {

    const [page, setPage] = useState(1);


    return(
        <div>
            <Pagination 
                pages={8}
                currentPage={page}
                setCurrentPage={setPage}
            
            />
        </div>
    )


}


export default TestingPage;