const getHeaders = (type, body) => {

    const headers = {
        "Content-type": "application/json",
    };
    if (type === "get") {
        return {
            method: "GET",
            headers: headers,
            ...headers
        }
    }
    else if (type === "post") {
        return {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        }
    }
}
export default function doRequest(url, action, type, body = {}) {
   return async dispatch => {
        dispatch({
            type: action.REQUEST,
        });
        let options = getHeaders(type, body);
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (data) {
                dispatch({type:action.SUCCESS,
                    response:data
                })
            }
            return data;
        }
        catch (e) { console.log(e) }
    }
}