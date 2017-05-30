const request = require('supertest');
const expect = require('chai').expect;
const app = require('../B-gle/B-gle.js');

describe('B.gle', () => {
    describe('# Get', () => {
        it('# Get Single Bigle',(done)=>{
            request(app)
                .get('/b-gle/592cc2fc51b9bc044c0e9bb7')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        console.log('error');
                        done(err);
                        return;
                    }
                    expect(res.text).to.equal('592cc2fc51b9bc044c0e9bb7');
                    done();
                });

        });
    });
    describe('# Post', () => {
        it('# Upload Single Image', (done) => {
            request(app)
                .post('/b-gle')
                .attach('Image1', 'test/image/test.jpg')
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