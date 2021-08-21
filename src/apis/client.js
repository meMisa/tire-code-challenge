import axios from 'axios';

export const BASE_URL = 'https://api-ssl.bitly.com/v4/';

const requestConfig = {
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
    },
    maxRedirects: 0,
    timeout: 9000,
};

const instance = axios.create(requestConfig);

instance.interceptors.request.use((config) => {
    const accessToken = process.env.REACT_APP_BITLY_AUTORIZATION_TOKEN;
    const configs = config;

    if (accessToken) {
        configs.headers.Authorization = `Bearer ${accessToken}`;
    }

    configs.params = { ...config.params || {} };
    return configs;
});

const getDispatch = (url, payload) => instance.get(url, payload);

const postDispatch = (url, payload) => instance.post(url, payload);

const putDispatch = (url, payload) => instance.put(url, payload);

const deleteDispatch = (url, payload) => instance.delete(url, payload);

function generateUrl(partialUrl, params = null) {
    let url = BASE_URL + partialUrl;
    let postFix = '';
    if (!params) return url;
    Object.keys(params).forEach((key) => {
        if (!params[key]) return;
        const searchKey = `{${key}}`;
        if (url.indexOf(searchKey) !== -1) {
            url = url.replace(searchKey, params[key]);
        } else {
            if (!postFix) {
                postFix = '?';
            } else {
                postFix += '&';
            }
            postFix += `${key}=${params[key]}`;
        }
    });
    return url + postFix;
}

const self = function dispatch(urlInfo, params = null, payload = null) {
    let body;
    const url = generateUrl(urlInfo.url, params);
    if (urlInfo.method === 'get') body = getDispatch;
    if (urlInfo.method === 'post') body = postDispatch;
    if (urlInfo.method === 'put') body = putDispatch;
    if (urlInfo.method === 'delete') body = deleteDispatch;

    return new Promise((resolve, reject) => {
        body(url, payload)
            .then(data => resolve(data.data))
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    // call refresh token api for getting new access token
                } else {
                    // if want to override so omit from here and go to reducers in error action part
                    reject(err.response);
                }
            });
    });
};

export default self;
