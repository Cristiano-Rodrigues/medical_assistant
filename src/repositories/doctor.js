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

  async function getAll (patientId) {
    const sql = {
      query: 'SELECT d.* FROM doctor AS d JOIN patient AS p ' +
        'ON d.patient_id = p.id WHERE p.id = ? LIMIT 1000',
      values: [patientId]
    }
    return await connection.query(sql.query, sql.values)
  }

  async function getById ({
    patientId,
    doctorId
  }) {
    const sql = {
      query: 'SELECT d.* FROM doctor AS d JOIN patient AS p ' +
        'ON d.patient_id = p.id WHERE p.id = ? AND d.id = ? LIMIT 1;',
      values: [patientId, doctorId]
    }
    return (await connection.query(sql.query, sql.values))[0]
  }

  async function remove ({
    doctorId,
    patientId
  }) {
    const sql = {
      query: 'DELETE FROM doctor WHERE id = ? AND patient_id = ?',
      values: [doctorId, patientId]
    }
    return await connection.query(sql.query, sql.values)
  }

  async function update (doctorId, {
    name,
    phone,
    alternativeNumber,
    email
  }) {
    const sql = {
      query: 'UPDATE doctor SET name = ?, phone = ?, ' +
        'alternative_number = ?, email = ? WHERE id = ? LIMIT 1;',
      values: [name, phone, alternativeNumber, email, doctorId]
    }
    return await connection.query(sql.query, sql.values)
  }

  return {
    register,
    getByEmail,
    getAll,
    getById,
    remove,
    update
  }
}