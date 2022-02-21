import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { fetchCacheTTL } from '../constants';

export const useFetch = <T>(url: string, options?: RequestInit) => {

    const [response, setResponse] = useState<T>(null);
    const [error, setError] = useState<Error>(null);
    const [loading, setLoading] = useState(false);
    const [lastFetched, setLastFetched] = useState<Dayjs>(null);

    /**
     * IT: Performs a fetch request using fetch API
     * WHEN: lastFetched date changes
     */
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const res = await fetch(url, options);
                const json: T = await res.json();
                setResponse(json);
            } catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [lastFetched, setError, setLoading, setResponse]);

    /**
     * fetch from cache/server depending on age of current dataset
     */
    const get = () => {
        let performFetch = true;

        const now = dayjs();
        const timeDelta = now.diff(lastFetched, "minutes");

        if (timeDelta < fetchCacheTTL) {
            performFetch = false;
        }

        if (performFetch) {
            setLastFetched(now);
        }
    }

    return { response, error, get, loading};
};