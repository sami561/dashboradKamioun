import { useState, useEffect } from "react";

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchData = async (
    url,
    method = "GET",
    data = null,
    headers = {},
    apiKey = null
  ) => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      };

      if (apiKey) {
        config.headers["Authorization"] = `Bearer ${apiKey}`;
      }

      if (
        data &&
        (method === "POST" || method === "PUT" || method === "PATCH")
      ) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setResponse({ data: result });
    } catch (err) {
      setError({ message: err.message || "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchData, response };
};

export default useAxios;
