const request = require('supertest');
const expect = require('chai').expect;
const app = require('../B-gle/B-gle.js');

describe('Member', () => {
    it('# Test Signup', (done) => {
        //Todo : Remove _id, & Setting Primary Key ID
        request(app)
            .post('/member')
            .field('id', 'bgleTestID')
            .field('email', 'bgleTestID@begle.com')
            .field('lastName', '권')
            .field('firstName', '영재')
            .field('password', '1234')
            .attach('profile', 'test/image/test.jpg')
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