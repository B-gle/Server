const request = require('supertest');
const app = require('../B-gle/B-gle.js');
const Member = require('../B-gle/model/member');
const Group = require('../B-gle/model/group');

describe('# Group', () => {
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
    let dummyGroup = {
        _id : '5930f70fb286c3551182b029',
        title: 'Bgle',
        background: '#FFFFFFF'
    };

    before(async () => {
        await Member.remove({});
        await Group.remove({});
        let member1 = await new Member(dummyClient1).save();
        let member2 = await new Member(dummyClient2).save();
        let group = await new Group(dummyGroup).save();
        member1.addGroup(dummyGroup);
        await group.addMember(member1);
    });

    it('# Edit Group Title', (done) => {
        let group_id = dummyGroup._id;
        request(app)
            .put('/group/'+group_id)
            .field('title','Change Title')
            .field('id',dummyClient1.id)
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

    it('# Edit Group Title in No Member ',(done) => {
        let group_id = dummyGroup._id;
        request(app)
            .put('/group/'+group_id)
            .field('title','Change Title')
            .field('id',dummyClient2.id)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                done();
            });
    });



    it('# Invite Group', (done) => {
        let group_id = dummyGroup._id;
        request(app)
            .post('/group/'+group_id)
            .field('id',dummyClient2.id)
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

    it('# BookMark Group', (done) => {
        request(app)
            .post('/group/bookmark')
            .field('id',dummyClient1.id)
            .field('groupId',dummyGroup._id)
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

    it('# Delete Group', (done) => {
        let group_id = dummyGroup._id;
        request(app)
            .delete('/group/'+group_id)
            .field('id',dummyClient1.id)
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
});