import { useEffect, useState, useCallback } from "react";
import api from "../utils/instance";
import { getErrorMessage } from "../utils/helpers";

export default function useFetch(url, options = {}, auto = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api(url, options);
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    if (auto) fetchData();
  }, [fetchData, auto]);

  return { data, loading, error, refetch: fetchData };
}