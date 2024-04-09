// This is Spin code to seemlessly handle OpenWhisk apps written for Node.js
export async function handleRequest(request) {
    let params = {};
    try {
        // Extract parameters based on request method and content type
        if (request.method === 'GET') {
            const url = new URL(request.uri);
        
            // Accessing queryParams directly
            const queryParams = url.searchParams.queryParams;
        
            for (const key in queryParams) {
                if (queryParams.hasOwnProperty(key)) {
                    const value = queryParams[key];
                    params[key] = value;
                }
            }
        } else if (request.method === 'POST') {
            const contentType = request.headers['content-type'] || '';
            let body = await request.text();
            if (contentType.includes('application/json')) {
                params = JSON.parse(body);
            } else if (contentType.includes('application/x-www-form-urlencoded')) {
                // Manually parse the URL-encoded string
                const queryParams = body.split('&');
                for (const param of queryParams) {
                    const [key, value] = param.split('=');
                    if (key) {
                        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
                    }
                }
            }
        }
        // Call the main function
        var response = main(params) || {};

        // Determine the response payload
        const payload = response.payload || response.body || '';

        // Construct the response object
        const output = {
            status: response.status || 200,
            headers: response.headers || { "content-type": "text/plain" },
            body: payload
        };

        return output;

    } catch (error) {
        // Handle any errors
        return {
            status: 500,
            headers: { "content-type": "text/plain" },
            body: `Error: ${error.message}`
        };
    }
}

// Insert existing OpenWhisk function here
import { main } from '../actions/local/dispatcher.js';

main(params);
