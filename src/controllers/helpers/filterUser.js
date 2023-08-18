export function filterUser (user) {
  let output = {}
  const filterFields = [
    'password',
    'created_at',
    'updated_at'
  ]
  Object.keys(user).filter(field => (
    !filterFields.includes(field)
  )).forEach(field => output[field] = user[field])

  return output
}