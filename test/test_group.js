const request = require('supertest');
const expect = require('chai').expect;
const app = require('../B-gle/B-gle.js');
describe('# Group', () => {
    it('# Edit Group Title', (done) => {
        let group_id = '5930f70fb286c3551182b029';
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
        let group_id = '5930f70fb286c3551182b029';
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

    it('# Invite Group', (done) => {
        let group_id = '5930f70fb286c3551182b029';
        request(app)
            .post('/group/'+group_id)
            .field('id','testReceiver2')
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
    it('# BookMark Group', (done) => {
        request(app)
            .post('/group/bookmark')
            .field('id','testSender')
            .field('groupId','59340439af5acb66cc6bcbfa')
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