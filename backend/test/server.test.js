const request = require('supertest');
const nock = require('nock');
const app = require('../server');  

describe('GET /api/watch-history/:userId', () => {
  afterAll(async () => {
    nock.cleanAll();
  });

  it('should fetch and save watch history', async () => {
    const userId = '123';
    const mockResponse = [{ showId: '1', title: 'Example Show', progress: 50, liked: true }];

    nock('https://api.example.com')
      .get(`/users/${userId}/watch-history`)
      .reply(200, mockResponse);

    const response = await request(app).get(`/api/watch-history/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });
});
