export function patientRepository (connection) {
  async function create ({
    name,
    gender,
    born,
    address,
    phone,
    email,
    password,
    code
  }) {
    const sql = {
      query: 'INSERT INTO patient VALUES (default, ?, ?, ?, ?, ?, ?, ?, ?, default, default, default)',
      values: [name, gender, born, address, phone, email, password, code]
    }
    return await connection.query(sql.query, sql.values)
  }

  async function getByEmail (email) {
    const sql = {
      query: 'SELECT * FROM patient WHERE email = ? LIMIT 1',
      values: [email]
    }
    return (await connection.query(sql.query, sql.values))[0]
  }

  async function getById (id) {
    const sql = {
      query: 'SELECT * FROM patient WHERE id = ? LIMIT 1',
      values: [id]
    }
    return (await connection.query(sql.query, sql.values))[0]
  }

  async function update (id, {
    name,
    gender,
    born,
    address,
    phone,
    email
  }) {
    const sql = {
      query: 'UPDATE patient SET name = ?, gender = ?, born = ?, ' +
        'address = ?, phone = ?, email = ? WHERE id = ? LIMIT 1',
      values: [name, gender, born, address, phone, email, id]
    }
    return await connection.query(sql.query, sql.values)
  }

  return {
    create,
    getByEmail,
    getById,
    update
  }
}