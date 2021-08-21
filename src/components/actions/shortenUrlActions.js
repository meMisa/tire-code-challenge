export const ShortenUrlAction = {
    CHANGE_URL_VALUE: '@@shortenUrl/CHANGE_URL_VALUE',
    POST_SHORTEN_URL_REQUEST: '@@shortenUrl/POST_SHORTEN_URL_REQUEST',
    POST_SHORTEN_URL_SUCCESS: '@@shortenUrl/POST_SHORTEN_URL_SUCCESS',
    POST_SHORTEN_URL_ERROR: '@@shortenUrl/POST_SHORTEN_URL_ERROR',
};

export function changeUrlValue(payload) {
    return {
        type: ShortenUrlAction.CHANGE_URL_VALUE,
        payload,
    };
}

export function fetchShortenUrlRequest(payload) {
    return {
        type: ShortenUrlAction.POST_SHORTEN_URL_REQUEST,
        payload,
    };
}

export function fetchShortenUrlSuccess(payload) {
    return {
        type: ShortenUrlAction.POST_SHORTEN_URL_SUCCESS,
        payload,
    };
}

export function fetchShortenUrlError(payload) {
    return {
        type: ShortenUrlAction.POST_SHORTEN_URL_ERROR,
        payload,
    };
}
