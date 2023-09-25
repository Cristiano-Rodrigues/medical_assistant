import { hasNullValue } from './hasNullValue'

describe('hasNullValue', () => {
  test('Should return true if any null value inside', () => {
    const arr = [1, 2, 'three', null, 5]
    expect(hasNullValue(arr)).toBe(true)
  })

  test('Should return false if no null value inside', () => {
    const arr = [1, 2, 'three', false, 5]
    expect(hasNullValue(arr)).toBe(false)
  })
})