import React, { useEffect } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import "./index.scss";
import ReactPaginate from "react-paginate";

const Pagination = ({ coffeeItems ,page ,total , limit, setPage }) => {


  const totalPages = Math.ceil(total / limit);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setPage(selectedPage);
    localStorage.setItem('currentPage', selectedPage)  
  };


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <figure className="pagination">
      {coffeeItems.length > 0 && (
          <ReactPaginate

            previousLabel={<AiFillCaretLeft 
              className={`arrow${page > 1 ? "" : " disable"}`} />}
            nextLabel={<AiFillCaretRight className={page < totalPages ? "" : "disable"} />}
            breakLabel={"..."}


            pageCount={totalPages}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            breakLinkClassName="page-num"
            activeLinkClassName="active"
            //page={page - 1}
            forcePage={page -1}
            activeClassName="active"
            // disableInitialCallback={true}
          />
      )}
    </figure>
  );
};

export default Pagination;