import { filterUser } from './filterUser'

describe('filterUser', () => {
  test('Should filter some object fields', () => {
    const user = {
      password: 'any_password',
      created_at: new Date(),
      updated_at: new Date()
    }
    expect(filterUser(user)).toEqual({})
  })
})