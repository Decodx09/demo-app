const request = require('supertest');
const app = require('./app');

describe('SAuth API Tests', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to SAuth Demo API');
  });

  test('GET /health should return health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('SAuth service is running');
  });

  test('POST /auth/login should login with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpass' });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });

  test('POST /auth/login should reject empty credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: '', password: '' });
    
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid credentials');
  });

  test('POST /auth/login should reject missing credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({});
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Username and password required');
  });
});
