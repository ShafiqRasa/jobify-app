import { useJobContext } from "../../pages/all-jobs/all-jobs.page";
import Wrapper from "./pagination-component.styles";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const Pagination = () => {
  const { currentPage, numOfPages, setPage } = useJobContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const handlePrev = () => {
    let prevPage = currentPage - 1;
    if (currentPage === 1) prevPage = numOfPages;
    setPage(prevPage);
  };
  const handleNext = () => {
    let nextPage = currentPage + 1;
    if (nextPage > numOfPages) nextPage = 1;
    setPage(nextPage);
  };

  const pageButton = ({ pageNumber, active }) => (
    <button
      key={pageNumber}
      onClick={() => setPage(pageNumber)}
      className={`btn page-btn ${active && "active"}`}
    >
      {pageNumber}
    </button>
  );

  const renderPageButtons = () => {
    const pageBtns = [];
    // first page
    pageBtns.push(pageButton({ pageNumber: 1, active: currentPage === 1 }));

    // three dote before current page if current page is grater than the 3
    if (currentPage > 3)
      pageBtns.push(
        <button key="dots-1" className="btn dots">
          ...
        </button>
      );

    // one page before current page
    if (currentPage > 2)
      pageBtns.push(pageButton({ pageNumber: currentPage - 1, active: false }));

    // current page
    if (currentPage !== 1 && currentPage !== numOfPages)
      pageBtns.push(pageButton({ pageNumber: currentPage, active: true }));

    // one page after current page
    if (currentPage < numOfPages - 1)
      pageBtns.push(pageButton({ pageNumber: currentPage + 1, active: false }));

    // three dote after current page if current page is smaller than the numOfPage-1
    if (currentPage < numOfPages - 2)
      pageBtns.push(
        <button className="btn dots" key="dots+1">
          ...
        </button>
      );

    // last page
    pageBtns.push(
      pageButton({ pageNumber: numOfPages, active: currentPage === numOfPages })
    );
    return pageBtns;
  };

  return (
    <Wrapper>
      <button className="btn prev-btn" onClick={handlePrev}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button className="btn next-btn" onClick={handleNext}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default Pagination;
