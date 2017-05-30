const request = require('supertest');
const expect = require('chai').expect;
const app = require('../B-gle/B-gle.js');

describe('B.gle', () => {
    // Todo: Check Json Format expect.(content-type , json);
    describe('# Get', () => {
        it('# Get Single Bigle',(done)=>{
            let id = '592d0619c1e8af13bc683f98';
            request(app)
                .get('/post/'+id)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        console.log('error');
                        done(err);
                        return;
                    }
                    expect(res.text).to.equal(id);
                    done();
                });

        });
    });
    describe('# Post', () => {
        it('# Upload Single Image', (done) => {
            request(app)
                .post('/post')
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
        it('# Upload Single Image & Message', (done)=>{
           request(app)
               .post('/post')
               .field('message','Hello World')
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
        let id = '592d079ab3daeb13d6baa583';
        request(app)
            .put('/post/'+id)
            .field('message','Change Message')
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
            .del('/post/'+id)
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