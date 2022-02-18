import React, { useContext, useReducer, useState, useEffect } from "react";
import { actionType, BookingApiReturnType, DataDocument } from "./interface";

import { api } from '../../constants';

// Create context privately
const RestApiContext = React.createContext<BookingApiReturnType | undefined>(undefined);

/**
 * Handles messages to/from server
 */
const FetchAPIProvider = () => {

    //setup state
    const [state, setState] = useState<'idle' | 'loading'>('idle');
    const [data, setData] = useState<DataDocument>({rooms: [], bookings:[]});
    const [errors, setErrors] = useState('');

    const doFetch = (url): Promise<void> => {
        setState('loading');
        return fetch(url)
            .then((response) => {
                response.json()
                    .then(data => setData(data))
                    .catch(() => setErrors('failed to parse the data'))
                    .finally(() => setState('idle'))
                
            })
            .catch((err) => setErrors(err.message))
            .finally(() => setState('idle'))
    }

}

const useFetchApi = (): BookingApiReturnType => {
    const context = useContext(RestApiContext) as unknown as BookingApiReturnType;
    if (context === undefined) {
        throw new Error("useFetchApi must be used within a FetchAPIProvider");
    }
    return context;
}

export { useFetchApi }