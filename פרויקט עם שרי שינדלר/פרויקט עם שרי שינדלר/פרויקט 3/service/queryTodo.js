
function getTodoByConditionQuery(queryParams){
    let query = `SELECT * FROM ${process.env.DB_NAME}.todos`;
    if (Object.keys(queryParams).length == 1 && Object.keys(queryParams)[0] == "_limit") { 
        query += ' LIMIT ? ';
        return query
    }
    if (Object.keys(queryParams).length > 0) {
        query += ' WHERE ';
        const conditions = [];
        for (const key in queryParams) {
            conditions.push(`${key} = ?`);
        }
        query += conditions.join(' AND ');
    }
    return query
}

function getTodoByIdQuery() {
    const query = `SELECT * FROM ${process.env.DB_NAME}.todos  where id = ?`;
    return query
}

function addTodoQuery() {
    const query = `INSERT INTO ${process.env.DB_NAME}.todos(userId,title,completed) VALUES (?,?,?)`;
    return query
}

function deleteTodoQuery() {
    const query = `DELETE FROM ${process.env.DB_NAME}.todos WHERE id = ?`;
    return query
}

function updateTodoQuery(queryParams) {
    let query = `UPDATE ${process.env.DB_NAME}.todos SET `;
    const conditions = [];
    for (const key in queryParams) {
        conditions.push(`${key} = ?`);
    }
    query += conditions.join(' AND ');
    query += ' WHERE id = ?'
    return query
}

export {
    getTodoByConditionQuery,
    getTodoByIdQuery,
    addTodoQuery,
    deleteTodoQuery,
    updateTodoQuery
}