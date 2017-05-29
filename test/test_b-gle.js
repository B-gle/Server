const request = require('supertest');
const expect = require('chai').expect;
const app = require('../B-gle/B-gle.js');

describe('B.gle', () => {
    it('# Get', (done) => {
        request(app)
            .get('/b-gle')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log('error');
                    done(err);
                    return;
                }
                expect(res.text).to.equal('Hello');
                done();
            });

    });
    describe('# Post', () => {
        it('# Upload Single Picture', (done) => {
            request(app)
                .post('/b-gle')
                .attach('Image1', 'test/image/test.jpg')
                .end((err, res) => {
                    if (err) {
                        expect(res.text).to.equal('Fail Image');
                        done(err);
                        return;
                    }
                    expect(res.text).to.equal('Success Image');
                    done();
                });
        });
        it('# Upload Multi Picture', (done) => {
            request(app)
                .post('/b-gle')
                .attach('Image2', 'test/image/test.jpg')
                .attach('Image2', 'test/image/test2.jpg')
                .end((err, res) => {
                    if (err) {
                        expect(res.text).to.equal('Fail Image');
                        done(err);
                        return;
                    }
                    expect(res.text).to.equal('Success Image');
                    done();
                });
        });
        it('# Make Thumbnail Image', (done) => {
            done();
        });
    });

    it('# Put', (done) => {
        request(app)
            .put('/b-gle')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log('error');
                    done(err);
                    return;
                }
                expect(res.text).to.equal('Hello');
                done();
            });

    });
    it('# Delete', (done) => {
        request(app)
            .del('/b-gle')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log('error');
                    done(err);
                    return;
                }
                expect(res.text).to.equal('Hello');
                done();
            });

    });

});