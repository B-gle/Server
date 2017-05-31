const request = require('supertest');
const expect = require('chai').expect;
const app = require('../B-gle/B-gle.js');

describe('Bgle', () => {
    // Todo: Remove Id
    describe('# Get', () => {
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
    });
    describe('# Post', () => {
        it('# Upload Single Image', (done) => {
            request(app)
                .post('/bgle')
                .attach('Image1', 'test/image/test.jpg')
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
        it('# Upload Single Image & Message & No Group', (done) => {
            request(app)
                .post('/bgle')
                .field('message', 'Hello World')
                .field('sender', 'bgleTestID')
                .attach('Image1', 'test/image/test.jpg')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        expect(res.text).to.equal('Fail Image');
                        done(err);
                        return;
                    }
                    console.log(res.body);
                    done();
                });
        });
        it('# Upload Image & Message & Group', (done) => {
            request(app)
                .post('/bgle/592e7281bda410292cac3f37')
                .field('message', 'Hello World')
                .field('sender', 'Nesoy')
                .field('receiver', '["test1", "test2"]')
                .attach('Image1', 'test/image/test.jpg')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        expect(res.text).to.equal('Fail Image');
                        done(err);
                        return;
                    }
                    console.log(res.body);
                    done();
                });
        });
        it('# Upload Message', (done) => {
            request(app)
                .post('/bgle')
                .field('message', 'Hello World')
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
    });

    it('# Put', (done) => {
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
    it('# Delete', (done) => {
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