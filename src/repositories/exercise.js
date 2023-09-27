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

  return {
    register
  }
}