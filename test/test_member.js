const request = require('supertest');
const expect = require('chai').expect;
const app = require('../B-gle/B-gle.js');

describe('Member', () => {
    it('# Test Signup', (done) => {
        //Todo : Remove _id, & Setting Primary Key ID
        request(app)
            .post('/member')
            .field('id', 'testSender')
            .field('email', 'testSender@begle.com')
            .field('name', '보낸이')
            .field('password', '1234')
            .attach('image', 'test/image/test.jpg')
            .expect(200)

            .end((err, res) => {
                if (err) {
                    console.log('error');
                    done(err);
                    return;
                }
                expect(res.text).to.equal('success');
                done();
            });
    });
    it('# Test Signup', (done) => {
        //Todo : Remove _id, & Setting Primary Key ID
        request(app)
            .post('/member')
            .field('id', 'testReceiver1')
            .field('email', 'testReceiver1@begle.com')
            .field('name', '받는이')
            .field('password', '1234')
            .attach('image', 'test/image/test.jpg')
            .expect(200)

            .end((err, res) => {
                if (err) {
                    console.log('error');
                    done(err);
                    return;
                }
                expect(res.text).to.equal('success');
                done();
            });
    });
    it('# Test Signup', (done) => {
        //Todo : Remove _id, & Setting Primary Key ID
        request(app)
            .post('/member')
            .field('id', 'testReceiver2')
            .field('email', 'testReceiver2@begle.com')
            .field('name', '받는이')
            .field('password', '1234')
            .attach('image', 'test/image/test.jpg')
            .expect(200)

            .end((err, res) => {
                if (err) {
                    console.log('error');
                    done(err);
                    return;
                }
                expect(res.text).to.equal('success');
                done();
            });
    });

});