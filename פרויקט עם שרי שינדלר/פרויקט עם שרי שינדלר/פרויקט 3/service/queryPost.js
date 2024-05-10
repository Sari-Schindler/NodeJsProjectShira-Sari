
function getPostByConditionQuery(queryParams){
    let query = `SELECT * FROM ${process.env.DB_NAME}.posts`;
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

function getPostByIdQuery() {
    const query = `SELECT * FROM ${process.env.DB_NAME}.posts  where id = ?`;
    return query
}

function addPostQuery() {
    const query = `INSERT INTO ${process.env.DB_NAME}.posts(userId,title,body) VALUES (?,?,?)`;
    return query
}

function deletePostQuery() {
    const query = `DELETE FROM ${process.env.DB_NAME}.posts WHERE id = ?`;
    return query
}

function updatePostQuery(queryParams) {
    let query = `UPDATE ${process.env.DB_NAME}.posts SET `;
    const conditions = [];
    for (const key in queryParams) {
        conditions.push(`${key} = ?`);
    }
    query += conditions.join(' AND ');
    query += ' WHERE id = ?'
    return query
}

export {
    getPostByConditionQuery,
    getPostByIdQuery,
    addPostQuery,
    deletePostQuery,
    updatePostQuery
}