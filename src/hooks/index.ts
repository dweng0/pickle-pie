import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { fetchCacheTTL } from '../constants';

export const useFetch = <T>(url: string, options?: RequestInit) => {

    const [response, setResponse] = useState<T>(null);
    const [error, setError] = useState<Error>(null);
    const [loading, setLoading] = useState(true);
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

        const now = dayjs();
        const timeDelta = now.diff(lastFetched, "minutes");

        let performFetch = true;

        if (lastFetched === null) {
            performFetch = true;
        } else if (timeDelta < fetchCacheTTL) {
            performFetch = false;
        }

        if (performFetch) {
            setLastFetched(now);
        }
    }

    const post = (data): Promise<Response> => {
        let postOptions;

        try {
            postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        } catch {
            console.log('post options malformed');
        };

        return fetch(url, postOptions);
    }
    return { response, error, get, post, loading};
};