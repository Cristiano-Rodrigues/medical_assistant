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

  return {
    register
  }
}