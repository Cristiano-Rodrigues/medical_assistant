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

  async function getAll () {
    const sql = {
      query: 'SELECT * FROM glycemia LIMIT 1000',
      values: []
    }
    return await connection.query(sql.query, sql.values)
  }

  async function getById (id) {
    const sql = {
      query: 'SELECT * FROM glycemia WHERE id = ? LIMIT 1',
      values: [id]
    }
    return (await connection.query(sql.query, sql.values))[0]
  }

  return {
    register,
    getAll,
    getById
  }
}