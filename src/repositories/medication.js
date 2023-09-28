export function medicationRepository (connection) {
  async function register ({
    name,
    dosage,
    date,
    observation,
    patientId
  }) {
    const sql = {
      query: 'INSERT INTO medication VALUES (default, ?, ?, ?, ?, ?, default, default);',
      values: [name, dosage, date, observation, patientId]
    }
    return await connection.query(sql.query, sql.values)
  }

  return {
    register
  }
}