const request = require('supertest');
const mongoose = require('mongoose');
const winston = require('winston');
const Member = require('../B-gle/model/member');
const app = require('../B-gle/B-gle.js');

describe('# Member', () => {
    let dummyClient1 = {
        id: 'testSender',
        email: 'testSender@begle.com',
        name: 'testName',
        password: '1234',
        profile: 'testProfile'
    };
    let dummyClient2 = {
        id: 'testSender2',
        email: 'testSender2@begle.com',
        name: 'testName2',
        password: '1234',
        profile: 'testProfile'
    };
    let failClient = {
        id: 'testReceiver2',
        email: 'testReceiver2@begle.com',
        name: 'testName',
        password: '4321',
        profile: 'testProfile'
    };

    before(async () => {
        await Member.remove({});
        await new Member(dummyClient1).save();
    });

    it('# Success Signup', (done) => {
        request(app)
            .post('/member')
            .field('id', dummyClient2.id)
            .field('email', dummyClient2.email)
            .field('name', dummyClient2.name)
            .field('password', dummyClient2.password)
            .attach('image', 'test/image/test.jpg')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    winston.debug(err);
                    done(err);
                    return;
                }
                done();
            });
    });

    it('# Success Member Login', (done) =>{
        request(app)
            .post('/member/login')
            .field('id', dummyClient1.id)
            .field('password', dummyClient1.password)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    winston.debug(err);
                    done(err);
                    return;
                }
                done();
            });
    });

    it('# Fail Non-Member Login', (done) =>{
        request(app)
            .post('/member/login')
            .field('id', failClient.id)
            .field('password', failClient.password)
            .expect(404)
            .end((err, res) => {2
                if (err) {
                    winston.debug(err);
                    done(err);
                    return;
                }
                done();
            });
    });

    it('# Fail Member Wrong Password Login', (done) =>{
        request(app)
            .post('/member/login')
            .field('id', dummyClient1.id)
            .field('password', failClient.password)
            .expect(401)
            .end((err, res) => {
                if (err) {
                    winston.debug(err);
                    done(err);
                    return;
                }
                done();
            });
    });
});