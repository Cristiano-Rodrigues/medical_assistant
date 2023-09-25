export const hasNullValue = arr => arr.some(value => (
  value === null || value === undefined
))