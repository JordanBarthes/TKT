import React, { useState, useEffect } from "react";
import { fetchApi } from '../service/api';

export default function useDataFetching(dataSource) {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const json = await fetchApi(dataSource);

                if (json) {
                    setLoading(false);
                    setResults(json);
                }
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, [dataSource]);

    return {
        error,
        loading,
        results
    };
}
