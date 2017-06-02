const request = require('supertest');
const expect = require('chai').expect;
const app = require('../B-gle/B-gle.js');
describe('# Group', () => {
    it('# Edit Group Title', (done) => {
        let group_id = '5930c8eef3c9f34cc5b52adb';
        request(app)
            .put('/group/'+group_id)
            .field('title','Change Title')
            .expect(200)
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

    it('# Delete Group', (done) => {
        let group_id = '5930cc425803444cfd4c21f9';
        request(app)
            .delete('/group/'+group_id)
            .field('id','testReceiver1')
            .expect(200)
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