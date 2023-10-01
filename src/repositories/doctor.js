export function doctorRepository (connection) {
  async function register ({
    name,
    phone,
    alternativeNumber,
    email,
    patientId
  }) {
    const sql = {
      query: 'INSERT INTO doctor VALUES (default, ?, ?, ?, ?, ?, default, default);',
      values: [name, phone, alternativeNumber, email, patientId]
    }
    return await connection.query(sql.query, sql.values)
  }

  async function getByEmail ({
    patientId,
    email
  }) {
    const sql = {
      query: 'SELECT d.* FROM doctor AS d JOIN patient AS p ' +
        'ON d.patient_id = p.id WHERE p.id = ? AND d.email = ? LIMIT 1;',
      values: [patientId, email]
    }
    return (await connection.query(sql.query, sql.values))[0]
  }

  return {
    register,
    getByEmail
  }
}