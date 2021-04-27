import React from "react";
import ReactDOM from "react-dom";
import { SearchOutlined } from "@ant-design/icons";

export function Search({ onChange, placeholder, data }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = data.filter((item) => item.includes(searchTerm));
    setSearchResults(results);
  }, [searchTerm]);
  return (
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
  );
}
