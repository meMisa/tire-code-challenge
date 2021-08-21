/* eslint no-unused-vars: 1 */

import React, { useCallback, useRef } from 'react';
import shortenUrlApis from 'apis/shortenUrlApis';
// actions
import { URL_TO_SHOURTEN, URL, SHORTEN_COPY_URL } from 'constants/texts';
import { changeUrlValue,
    fetchShortenUrlRequest,
    fetchShortenUrlSuccess,
    fetchShortenUrlError } from './actions/shortenUrlActions';
// reducer
import { initialState, reducer } from './reducers/shortenReducer';
import 'styles/ShourtenUrlForm.css';

const ShortenUrlForm = () => {
    /** **************************************************** STATE  ****************************************** */
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const shortUrlRef = useRef(null);
    /** **************************************************** FUNCTIONS  ****************************************** */
    const onChange = useCallback((e) => {
        dispatch(changeUrlValue({ value: e.target.value }));
    }, []);

    const copyToClipboard = useCallback((link) => {
        navigator.clipboard.writeText(link);
    }, []);
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (!state.url || state.loading) return;

        dispatch(fetchShortenUrlRequest({ loading: true }));

        shortenUrlApis.postShortenUrl({ payload: { long_url: state.url } })
            .then((data) => {
                dispatch(fetchShortenUrlSuccess({ data }));
                copyToClipboard(data.link);
            })
            .catch((error) => {
                dispatch(fetchShortenUrlError(error));
            });

    }, [state.url, state.loading]);

    return (
        <div className="shourten-form-container">
            <form onSubmit={onSubmit}>
                <label htmlFor="shorten" data-testid="url-label">
                    {URL}
                    <input
                        className="url shorten-url-form-elements-common"
                        placeholder={URL_TO_SHOURTEN}
                        id="shorten"
                        type="url"
                        value={state.url}
                        onChange={onChange}
                    />
                </label>
                <div className="submit-wrapper">
                    <button
                        className={`shorten-url-form-elements-common ${state.loading ? 'disable-button' : ''}`}
                        type="submit"
                        data-testid="submit-button"
                    >
                        {SHORTEN_COPY_URL}
                    </button>
                </div>
                <div className="short-url" ref={shortUrlRef}>
                    {state.shortUrl}
                </div>
            </form>
        </div>
    );
};

export default ShortenUrlForm;
