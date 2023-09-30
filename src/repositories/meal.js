export function mealRepository (connection) {
  async function register ({
    meal,
    calories,
    date,
    observation,
    patientId
  }) {
    const sql = {
      query: 'INSERT INTO meal VALUES (default, ?, ?, ?, ?, ?, default, default);',
      values: [meal, calories, date, observation, patientId]
    }
    return await connection.query(sql.query, sql.values)
  }

  async function getAll (patientId) {
    const sql = {
      query: 'SELECT m.* FROM meal AS m JOIN patient AS ' +
        'p ON m.patient_id = p.id WHERE p.id = ? LIMIT 1000;',
      values: [patientId]
    }
    return await connection.query(sql.query, sql.values)
  }

  async function getById ({
    patientId,
    mealId
  }) {
    const sql = {
      query: 'SELECT m.* FROM meal AS m JOIN patient AS p ON m.patient_id = p.id WHERE p.id = ? AND m.id = ?;',
      values: [patientId, mealId]
    }
    return (await connection.query(sql.query, sql.values))[0]
  }

  return {
    register,
    getAll,
    getById
  }
}