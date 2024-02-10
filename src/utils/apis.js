import axios from "axios";

export async function apiReq(endPoint, data, method, headers) {
    return new Promise(async (res, rej) => {
        axios({
            url: endPoint,
            method: method,
            data: data,
            headers: headers
        })
            .then(function (response) {
                return res(response.data)
            })
            .catch(function (error) {
                return rej(error)
            })
    });
}

export function apiGet(endpoint, data, headers) {
    return apiReq(endpoint, data, 'get', headers);
}

export function apiPost(endpoint, data, headers) {
    return apiReq(endpoint, data, 'post', headers);
}