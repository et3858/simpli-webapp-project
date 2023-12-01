const URL_SOURCE = import.meta.env.VITE_API_URL;

const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

const OPTIONS: RequestInit = {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: HEADERS,
    redirect: "follow",
    referrerPolicy: "no-referrer",
};


export function getRequest(endpoint: string = ""): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(URL_SOURCE + endpoint, OPTIONS)
            .then(response => response.json())
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}


export function postRequest(endpoint: string = "", data: object = {}) {
    return new Promise((resolve, reject) => {
        fetch(URL_SOURCE + endpoint, {
            ...OPTIONS,
            method: "POST",
            body: JSON.stringify(data),
        })
            // .then(response => response.json())
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }

                return response.json();
            })
            .then(response => {
                resolve(response);
            })
            .catch(response => {
                if (!response?.status) {
                    return reject({ error: { msg: "You are disconnected. Try it later." } });
                }

                response.json().then((data: { [key: string]: any }) => reject(data));
            });
    })
}
