export interface UrlQuery {
    key: string,
    value: string
}

/**
 * wraps pushstate functionality and ands url encoding
 * @param queryParam
 */
const pushQuery = (queryParam: UrlQuery) => {

    const key   = encodeURIComponent(queryParam.key);
    const value = encodeURIComponent(queryParam.value);

    const url   = new URL(window.location.href);
          url.searchParams.set(key, value);

    window.history.pushState({}, '', url.toString());
}
export default pushQuery;