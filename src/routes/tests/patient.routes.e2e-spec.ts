import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../app';

describe('Patient', () => {
  it('Should be able to create a new patient', async () => {
    const result = await request(app).post('/patients').send({
      name: 'user_supertest',
      username: 'user_supertest',
      password: 'user_password',
      email: 'user_supertest@email.com',
      document: 'user_document_supertest'
    })

    expect(result.body).toHaveProperty('id');
    expect(result.statusCode).eq(200)
  });
});
