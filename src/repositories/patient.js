export function patientRepository (connection) {
  async function create ({
    name,
    gender,
    born,
    address,
    phone,
    email,
    password
  }) {
    const sql = {
      query: 'INSERT INTO patient VALUES (default, ?, ?, ?, ?, ?, ?, ?, default, default)',
      values: [name, gender, born, address, phone, email, password]
    }
    return await connection.query(sql.query, sql.values)
  }

  return {
    create
  }
}