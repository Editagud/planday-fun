import React from "react";
import ReactDOM from "react-dom";
import { GridList } from "../components/GridList";
import { usePagination } from "react-use-pagination";
import { Search } from "../components/Search";
import { Breadcrumb } from "antd";

export function LandingPage({ data }) {
  // search input states and handelinf
  const [searchTerm, setSearchTerm] = React.useState("");

  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, data]);

  //pagination
  const {
    currentPage,
    totalPages,
    setNextPage,
    setPreviousPage,
    nextEnabled,
    previousEnabled,
    startIndex,
    endIndex,
  } = usePagination({
    totalItems: searchResults.length + 1,
    initialPageSize: 6,
  });

  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Eddie's app</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>

      <div>
        <div className="Search">
          <span className="SearchSpan"></span>

          <input
            className="SearchInput"
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search"
          />
        </div>
        {!searchResults.length ? (
          <div>shit</div>
        ) : (
          <GridList
            data={
              searchResults.length > 1
                ? searchResults.slice(startIndex, endIndex)
                : searchResults
            }
          />
        )}
        <div className="Pagination">
          <button onClick={setPreviousPage} disabled={!previousEnabled}>
            Previous
          </button>
          <span>
            Current: {currentPage + 1} of {totalPages}
          </span>
          <button onClick={setNextPage} disabled={!nextEnabled}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
