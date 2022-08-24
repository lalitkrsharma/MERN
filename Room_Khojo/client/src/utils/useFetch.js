import { useState, useEffect } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const abortCont = new AbortController();
  options = { ...options, signal: abortCont.signal };
  useEffect(() => {
    // if (options.authorization != null)
    fetch(url, options)
      .then((res) => {
        if (res.status === 204) {
          throw Error("No Content Found.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.error || (data.statusCode && data.statusCode >= 400)) {
          throw Error(data.error || data.message);
        }
        console.log(data);
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
          setIsPending(false);
          setError("Fetch Aborted");
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    // abort the fetch
    // return () => abortCont.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
