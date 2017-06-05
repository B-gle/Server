const request = require('supertest');
const winston = require('winston');
const mongoose = require('mongoose');
const Member = require('../B-gle/model/Member');
const app = require('../B-gle/B-gle.js');

describe('# Friend', () => {
    // Todo : Refactor Duplicate Dummy Code
    let dummyClient1 = {
        id: 'testSender',
        email: 'testSender@begle.com',
        name: 'testName',
        password: '1234',
        profile: 'testProfile'
    };
    let dummyClient2 = {
        id: 'testReceiver1',
        email: 'testReceiver1@begle.com',
        name: 'testName',
        password: '1234',
        profile: 'testProfile'
    };
    let failClient = {
        id: 'testReceiver2',
        email: 'testReceiver2@begle.com',
        name: 'testName',
        password: '1234',
        profile: 'testProfile'
    };

    before(async () => {
        await Member.remove({});
        await new Member(dummyClient1).save();
        await new Member(dummyClient2).save();
    });

    it('# Add Friend', (done) => {
        request(app)
            .post('/friend/')
            .field('id', dummyClient1.id)
            .field('friendId', dummyClient2.id)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    winston.log(err);
                    done(err);
                    return;
                }
                done();
            });
    });

    it('# Success Remove Friend', (done) => {
        request(app)
            .delete('/friend/')
            .field('id', dummyClient1.id)
            .field('friendId', dummyClient2.id)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    winston.log(err);
                    done(err);
                    return;
                }
                done();
            });
    });

    it('# Fail Remove Friend', (done) => {
        request(app)
            .delete('/friend/')
            .field('id', dummyClient1.id)
            .field('friendId', dummyClient2.id)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    winston.log(err);
                    done(err);
                    return;
                }
                done();
            });
    });

    it('# Success Find Friend', (done) => {
        request(app)
            .get('/friend')
            .query({id: dummyClient1.id})
            .expect(200)
            .end((err, res) => {
                if (err) {
                    winston.log(err);
                    done(err);
                    return;
                }
                done();
            });
    });

    it('# Fail Find Friend', (done) => {
        request(app)
            .get('/friend')
            .query({id: failClient.id})
            .expect(404)
            .end((err, res) => {
                if (err) {
                    winston.log(err);
                    done(err);
                    return;
                }
                done();
            });
    });

    it('# Bookmark Friend', (done) => {
        request(app)
            .post('/friend/bookmark')
            .field('id', dummyClient1.id)
            .field('friendId', dummyClient2.id)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    winston.log(err);
                    done(err);
                    return;
                }
                done();
            });
    });
});