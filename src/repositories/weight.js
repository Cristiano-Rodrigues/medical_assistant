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

  async function getAll(patientId) {
    const sql = {
      query: 'SELECT w.* FROM weight AS w JOIN patient AS p ON ' +
        'w.patient_id = p.id WHERE p.id = ? LIMIT 1000',
      values: [patientId]
    }
    return await connection.query(sql.query, sql.values)
  }

  return {
    register,
    getAll
  }
}