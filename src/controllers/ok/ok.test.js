import { success } from '../../helpers'
import { ok } from './ok'

describe('ok', () => {
  test('Should return correct answer', async () => {
    const result = await ok()
    expect(result).toEqual(success())
  })
})