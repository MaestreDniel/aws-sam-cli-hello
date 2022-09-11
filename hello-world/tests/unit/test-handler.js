'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
const event = require('../../../events/event.json');
const event2 = require('../../../events/event_2.json');
let currentTime = new Date().toLocaleString('en-US', {timeZone: 'Europe/Madrid'});

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const result = await app.lambdaHandler(event)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        //let response = JSON.parse(result.body);

        expect(result.body).to.be.equal(`
        <hr/>
        <h1>Hello, Kevin, the time is ${currentTime}.</h1>
        <h2>Deployed from SAM CLI</h2>
        <hr/>
        `);
    });

    it('validates the name query string', async () => {
        const result = await app.lambdaHandler(event2)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');
        expect(result.body).to.be.equal(`<h1>Please, add a name query string!</h1>`);
    });
});
