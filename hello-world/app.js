'use strict';
 
exports.lambdaHandler = async (event) => {
    let name = "Please, add a name query string!";
    let currentTime = new Date().toLocaleString('en-US', {timeZone: 'Europe/Madrid'});
    let responseCode = 200;
    let greeting;
    console.log("request: " + JSON.stringify(event));
    
    if (event.queryStringParameters && event.queryStringParameters.name) {
        name = event.queryStringParameters.name;
        greeting = `
        <hr/>
        <h1>Hello, ${name}, the time is ${currentTime}.</h1>
        <h2>Deployed from SAM CLI</h2>
        <hr/>
        `;
    } else {
        greeting = `<h1>${name}</h1>`;
    }

    /*let responseBody = {
        message: greeting,
        input: event
    };*/
    
    let response = {
        statusCode: responseCode,
        headers: {
            'Content-Type': 'text/html; charset=utf-8'
        },
        // body: JSON.stringify(responseBody)
        body: greeting
    };
    
    return response;
};