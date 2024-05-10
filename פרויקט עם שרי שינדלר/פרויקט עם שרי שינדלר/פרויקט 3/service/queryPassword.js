
function getPasswordByIdQuery() {
    const query = `SELECT * FROM ${process.env.DB_NAME}.passwords  where userId = ?`;
    return query
}

function addPasswordQuery() {
    const query = `INSERT INTO ${process.env.DB_NAME}.passwords(userId,password) VALUES (?,?)`;
    return query
}

function deletePasswordQuery() {
    const query = `DELETE FROM ${process.env.DB_NAME}.passwords WHERE userId = ?`;
    return query
}

function updatePasswordQuery(queryParams) {
    let query = `UPDATE ${process.env.DB_NAME}.passwords SET `;
    const conditions = [];
    for (const key in queryParams) {
        conditions.push(`${key} = ?`);
    }
    query += conditions.join(' AND ');
    query += ' WHERE userId = ?'
    return query
}

export {
    getPasswordByIdQuery,
    addPasswordQuery,
    deletePasswordQuery,
    updatePasswordQuery
}