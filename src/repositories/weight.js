export function weightRepository (connection) {
  async function register ({
    weight,
    height,
    date,
    observation,
    patientId
  }) {
    const sql = {
      query: 'INSERT INTO weight VALUES (default, ?, ?, ?, ?, ?)',
      values:  [weight, height, date, observation, patientId] 
    }
    return await connection.query(sql.query, sql.values)
  }

  return {
    register
  }
}