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

  async function getAll(patientId) {
    const sql = {
      query: 'SELECT m.* FROM medication AS m JOIN patient AS ' +
        'p ON m.patient_id = p.id WHERE p.id = ? LIMIT 1000',
      values: [patientId]
    }
    return await connection.query(sql.query, sql.values)
  }

  return {
    register,
    getAll
  }
}