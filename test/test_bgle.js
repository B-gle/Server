const request = require('supertest');
const expect = require('chai').expect;
const Bgle = require('../B-gle/model/bgle');
const Member = require('../B-gle/model/member');
const app = require('../B-gle/B-gle.js');

describe('# Bgle', () => {
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
    before(async () => {
        await Member.remove({});
        await Bgle.remove({});
        await new Bgle(dummyClient1).save();
        await new Member(dummyClient2).save();
    });

    it('# Get Single Bigle', (done) => {
        let id = '592e56d882e2842713369e43';
        request(app)
            .get('/bgle/' + id)
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


    it('# Upload Single Image & Message & No Group & One to One', (done) => {
        request(app)
            .post('/bgle')
            .field('sender', 'testSender')
            .field('receiver', 'testReceiver1')
            .field('message', 'Hello Node.js')
            .attach('image', 'test/image/test.jpg')
            .end((err, res) => {
                if (err) {
                    expect(res.text).to.equal('Fail Image');
                    done(err);
                    return;
                }
                done();
            });
    });
    it('# Upload Single Image & Message & No Group & one to Many', (done) => {
        request(app)
            .post('/bgle')
            .field('sender', 'testSender')
            .field('receiver', 'testReceiver1')
            .field('receiver', 'testReceiver2')
            .field('message', 'Hello Node.js')
            .attach('image', 'test/image/test.jpg')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) {
                    expect(res.text).to.equal('Fail Image');
                    done(err);
                    return;
                }
                done();
            });
    });
    it('# Upload Single Image & Message & Group', (done) => {
        let groupid = '592fcdec9add3e4301d13814';
        request(app)
            .post('/bgle/' + groupid)
            .field('sender', 'testSender')
            .field('message', 'Hello Node.js')
            .attach('image', 'test/image/test.jpg')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) {
                    expect(res.text).to.equal('Fail Image');
                    done(err);
                    return;
                }
                done();
            });
    });
    it('# Comments Bgle', (done) => {
        let bgleid = '592fd48c5610b9457654fa0e';
        request(app)
            .post('/comment/' + bgleid)
            .field('writer', 'testSender')
            .field('message', 'Test Comment')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    expect(res.text).to.equal('Error Find Post!');
                    done(err);
                    return;
                }
                done();
            });
    });
    it('# Like Bgle', (done) => {
        let bgleid = '592fd48c5610b9457654fa0e';
        request(app)
            .post('/like/' + bgleid)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    expect(res.text).to.equal('Error Find Post!');
                    done(err);
                    return;
                }
                done();
            });
    });


    it('# Edit Bgle', (done) => {
        let id = '592d079ab3daeb13d6baa583';
        request(app)
            .put('/bgle/' + id)
            .field('message', 'Change Message')
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

    it('# Remove Bgle', (done) => {
        let id = '592d0619c1e8af13bc683f98';
        request(app)
            .del('/bgle/' + id)
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