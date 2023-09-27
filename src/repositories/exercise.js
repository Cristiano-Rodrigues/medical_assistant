export function exerciseRepository (connection) {
  async function register ({
    type,
    date,
    duration,
    observation,
    patientId
  }) {
    const sql = {
      query: 'INSERT INTO exercise VALUES (default, ?, ?, ?, ?, ?, default, default);',
      values: [type, date, duration, observation, patientId]
    }
    return await connection.query(sql.query, sql.values)
  }

  async function getAll (patientId) {
    const sql = {
      query: 'SELECT e.* FROM exercise AS e JOIN patient AS ' +
        'p ON e.patient_id = p.id WHERE p.id = ? LIMIT 1000;',
      values: [patientId]
    }
    return await connection.query(sql.query, sql.values)
  }

  return {
    register,
    getAll
  }
}