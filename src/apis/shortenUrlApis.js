import Dispatch from 'apis/client';

const urls = {
    shortenUrl: method => ({
        url: 'shorten',
        method,
    }),
};

function api() {
    return {
        postShortenUrl: data => Dispatch(urls.shortenUrl('post'), data.params, data.payload),
    };
}

export default api();
