export class Ajax {
    constructor(options) {
        this.defaultOptions = {
            baseURL: options.baseURL||'localhost',
            timeout: options.timeout||5000,
            baseBody: options.baseBody||'{}',
            headers: {
                'Content-Type': options.contentType||'application/json',
                'Authorization': options.authorization||'',
                ...options.headers
            }
        };
    }

    OverrideHeader(header) {
        for (const key in this.defaultOptions.headers) {
            if (!key in header) {
                header.append(key, this.defaultOptions.headers[key]);
            }
        }
        return header;
    }

    ErrorHandler(response){
        switch(response.status){
            case 400:
                throw new Error("400: Bad Request");
            case 401:
                throw new Error("401: Unauthorized");
            case 403:
                throw new Error("403: Forbidden");
            case 404:
                throw new Error("404: Not Found");
            case 500:
                throw new Error("500: Internal Server Error");
            case 502:
                throw new Error("502: Bad Gateway");
            case 504:
                throw new Error("504: Gateway Timeout");
            default:
                return response;
        }
    }

    async get(url, options) {
        const abortC = new AbortController();
        setTimeout(() => {
            abortC.abort();
        }, (options?.timeout??this.defaultOptions.timeout));
        const response = await fetch(url||this.defaultOptions.baseURL, {
            method: 'GET',
            headers: { ...this.defaultOptions.headers, ...options?.headers },
        });
        this.ErrorHandler(response);
        return response.json();
    }

    async post(url, data, options) {
        const abortC = new AbortController();
        setTimeout(() => {
            abortC.abort();
        }, (options?.timeout??this.defaultOptions.timeout));
        const response = await fetch(url||this.defaultOptions.baseURL, {
            method: 'POST',
            headers: { ...this.defaultOptions.headers, ...options?.headers },
            body: JSON.stringify(data??this.defaultOptions.baseBody)
        });
        this.ErrorHandler(response);
        return response.json()
    }

    async put(url, data, options) {
        const abortC = new AbortController();
        setTimeout(() => {
            abortC.abort();
        }, (options?.timeout??this.defaultOptions.timeout));
        const response = await fetch(url||this.defaultOptions.baseURL, {
            method: 'PUT',
            headers: { ...this.defaultOptions.headers, ...options?.headers },
            body: JSON.stringify(data??this.defaultOptions.baseBody)
        });
        this.ErrorHandler(response);
        return response.json();
    }

    async delete(url, options) {
        const abortC = new AbortController();
        setTimeout(() => {
            abortC.abort();
        }, (options?.timeout??this.defaultOptions.timeout));
        const response = await fetch(url||this.defaultOptions.baseURL, {
        method: 'DELETE',
        headers: { ...this.defaultOptions.headers, ...options?.headers },
        });
        this.ErrorHandler(response);
        return response.json();
    }
}