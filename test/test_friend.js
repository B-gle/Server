const request = require('supertest');
const expect = require('chai').expect;
const app = require('../B-gle/B-gle.js');

describe('# Friend', () => {
    it('# Add Friend', (done) => {
        request(app)
            .post('/friend/')
            .field('id','testSender')
            .field('friendId','testReceiver1')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log('error');
                    done(err);
                    return;
                }
                done();
            });
    });

    it('# Remove Friend', (done) => {
        request(app)
            .delete('/friend/')
            .field('id','testSender')
            .field('friendId','testReceiver1')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log('error');
                    done(err);
                    return;
                }
                done();
            });
    });

    it('# Find Friend', (done) => {
        request(app)
            .get('/friend')
            .query({id:'testSender'})
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

    it('# Bookmark Friend', (done) =>{
        request(app)
            .post('/friend/bookmark')
            .field('id','testSender')
            .field('friendId', 'testReceiver1')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log('error');
                    done(err);
                    return;
                }
                done();
            });
    });
});