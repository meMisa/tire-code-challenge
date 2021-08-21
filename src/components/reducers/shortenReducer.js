// actions
import { ShortenUrlAction } from '../actions/shortenUrlActions';

export const initialState = {
    url: '',
    shortUrl: '',
    loading: false,
};

export function reducer(state, action) {
    switch (action.type) {
        case ShortenUrlAction.POST_SHORTEN_URL_REQUEST:
            return {
                ...state,
                loading: action.payload.loading,
            };
        case ShortenUrlAction.POST_SHORTEN_URL_SUCCESS:
            return {
                ...state,
                shortUrl: action.payload.data.link,
                loading: false,
            };
        case ShortenUrlAction.POST_SHORTEN_URL_ERROR:
            return {
                ...state,
                loading: false,
            };
        case ShortenUrlAction.CHANGE_URL_VALUE:
            return {
                ...state,
                url: action.payload.value,
            };
        default: {
            return state;
        }
    }
}
