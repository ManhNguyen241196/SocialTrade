import { Link } from "react-router-dom";
import "./searchTop.css";
import SearchRow from "./searchRow/SearchRow";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchTop = ({ word }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log("SearchTop", word);

  // fetchData search
  useEffect(() => {
    const fetchResultUser = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post(
          "http://localhost:8800/api/search/all?search=" + word
        );
        setIsLoading(false);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (word.trim() !== "") {
      fetchResultUser();
    } else {
      setData([]);
    }
  }, [word]);

  return (
    <>
      <div className="popupSearch">
        {isLoading ? (
          <div className="popupSearch_body">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <div className="popupSearch_body">
              {data?.map((user) => {
                return <SearchRow key={user.id} dataUser={user} />;
              })}
            </div>
            <Link className="popupSearch_footer" to="/">
              Show more
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default SearchTop;
