export interface UrlQuery {
    key: string,
    value: string
}

/**
 * wraps pushstate functionality and ands url encoding
 * @param queryParam
 */
export const pushQuery = (queryParam: UrlQuery): void => {

    const key   = encodeURIComponent(queryParam.key);
    const value = encodeURIComponent(queryParam.value);

    const url   = new URL(window.location.href);
          url.searchParams.set(key, value);

    window.history.pushState({}, '', url.toString());
}

/**
 * 
 * Wraps url search api and provide url decoding
 * @param key
 */
export const getQuery = (key: string, search?:string): string => {
    const queryString = search || window.location.search;
    const result = new URLSearchParams(queryString).get(key);
    if (result) {
        return decodeURIComponent(result.toString());
    } else {
        return '';
    }    
}