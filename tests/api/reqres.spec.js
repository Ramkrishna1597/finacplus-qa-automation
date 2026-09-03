import { test, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in/api/collections/users/records';
const API_KEY = process.env.REQRES_API_KEY;

const newUser = {
  name: 'Ramkrishna Keer',
  job: 'QA Automation Engineer'
};

const updatedName = 'Ramkrishna Keer - Updated';

test.describe('ReqRes User API', () => {

  test('create, get and update user', async ({ request }) => {

    // 1. Create user
    const createResponse = await request.post(BASE_URL, {
      headers: {
        'x-api-key': API_KEY,
        'X-Reqres-Env': 'prod',
        'Content-Type': 'application/json'
      },
      data: {
        data: newUser
      }
    });

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();

    expect(createdUser.data).toHaveProperty('id');
    expect(createdUser.data.data.name).toBe(newUser.name);
    expect(createdUser.data.data.job).toBe(newUser.job);

    const userId = createdUser.data.id;

    // 2. Get the created user
    const getResponse = await request.get(`${BASE_URL}/${userId}`, {
      headers: {
        'x-api-key': API_KEY,
        'X-Reqres-Env': 'prod'
      }
    });

    expect(getResponse.status()).toBe(200);

    const fetchedUser = await getResponse.json();

    expect(fetchedUser.data.id).toBe(userId);
    expect(fetchedUser.data.data.name).toBe(newUser.name);
    expect(fetchedUser.data.data.job).toBe(newUser.job);

    // 3. Update user's name
    const updateResponse = await request.put(`${BASE_URL}/${userId}`, {
      headers: {
        'x-api-key': API_KEY,
        'X-Reqres-Env': 'prod',
        'Content-Type': 'application/json'
      },
      data: {
        data: {
          name: updatedName,
          job: newUser.job
        }
      }
    });

    expect(updateResponse.status()).toBe(200);

    const updatedUser = await updateResponse.json();

    expect(updatedUser.data.id).toBe(userId);
    expect(updatedUser.data.data.name).toBe(updatedName);
    expect(updatedUser.data.data.job).toBe(newUser.job);
  });

});