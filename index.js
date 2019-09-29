exports.handler = async (event, context, callback) => {
    // get contents of the response
    const response = event.Records[0].cf.response;
    const headers = response.headers;
    // get contents of the request
    const request = event.Records[0].cf.request;
    
    if (request.uri === '/xsspoc') {
        headers['access-control-allow-origin'] = [{key: 'Access-Control-Allow-Origin', value: '*'}];
        headers['access-control-allow-headers'] = [{key: 'Access-Control-Allow-Headers', value: 'x-requested-with'}];
        headers['access-control-allow-credentials'] = [{key: 'Access-Control-Allow-Credentials', value: 'true'}];
        
        headers['strict-transport-security'] = [{key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubdomains; preload'}];
    }
    else {
        headers['strict-transport-security'] = [{key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubdomains; preload'}];
        headers['referrer-policy'] = [{key: 'Referrer-Policy', value: 'same-origin'}];
        headers['x-xss-protection'] = [{key: 'X-XSS-Protection', value: '1; mode=block'}];
        headers['x-frame-options'] = [{key: 'X-Frame-Options', value: 'DENY'}];
        headers['x-content-type-options'] = [{key: 'X-Content-Type-Options', value: 'nosniff'}];
        headers['content-security-policy'] = [{key: 'Content-Security-Policy', value: "default-src 'none'; img-src 'self'; script-src 'unsafe-inline' https://www.mislav-bozicevic.iz.hr/scripts/app.js; style-src 'self'; object-src 'none'"}];
    }
    
    callback(null, response);
};

