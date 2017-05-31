const request = require('supertest');
const expect = require('chai').expect;
const app = require('../B-gle/B-gle.js');
describe('Test', () => {
    it('Test Name', (done) => {
        let group_id = '592e761e18207f295ce6fbf5';
        request(app)
            .put('/group/'+group_id)
            .field('title','Change Title')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) {
                    console.log('error');
                    done(err);
                    return;
                }
                console.log(res.body);
                done();
            });
    });

});