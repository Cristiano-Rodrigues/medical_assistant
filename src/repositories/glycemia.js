export function glycemiaRepository (connection) {
  async function register ({
    level,
    patientId,
    date,
    observation
  }) {
    const sql = {
      query: 'INSERT INTO glycemia VALUES (default, ?, ?, ?, ?, default, default)',
      values: [level, date, observation, patientId]
    }
    return await connection.query(sql.query, sql.values)
  }

  async function register (email) {
    const sql = {
      query: 'SELECT * FROM patient WHERE email = ? LIMIT 1',
      values: [email]
    }
    return (await connection.query(sql.query, sql.values))[0]
  }

  return {
    register
  }
}