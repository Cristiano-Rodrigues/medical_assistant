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

  async function getAll (patientId) {
    const sql = {
      query: 'SELECT g.* FROM glycemia AS g JOIN patient AS' +
        ' p ON g.patient_id = p.id WHERE p.id = ? LIMIT 1000',
      values: [patientId]
    }
    return await connection.query(sql.query, sql.values)
  }

  async function getById ({
    patientId,
    glycemiaId
  }) {
    const sql = {
      query: 'SELECT g.* FROM glycemia AS g JOIN patient AS' +
        ' p ON g.patient_id = p.id WHERE p.id = ? AND g.id = ? ' +
        'LIMIT 1',
      values: [patientId, glycemiaId]
    }
    return (await connection.query(sql.query, sql.values))[0]
  }

  return {
    register,
    getAll,
    getById
  }
}