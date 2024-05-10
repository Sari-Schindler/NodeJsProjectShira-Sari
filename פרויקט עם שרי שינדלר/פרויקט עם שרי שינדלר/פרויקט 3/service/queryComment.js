
function getCommentByConditionQuery(queryParams){
    let query = `SELECT * FROM ${process.env.DB_NAME}.comments`;
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

function getCommentByIdQuery() {
    const query = `SELECT * FROM ${process.env.DB_NAME}.comments  where id = ?`;
    return query
}

function addCommentQuery() {
    const query = `INSERT INTO ${process.env.DB_NAME}.comments(postId,name,email,body) VALUES (?,?,?,?)`;
    return query
}

function deleteCommentQuery() {
    const query = `DELETE FROM ${process.env.DB_NAME}.comments WHERE id = ?`;
    return query
}

function updateCommentQuery(queryParams) {
    let query = `UPDATE ${process.env.DB_NAME}.comments SET `;
    const conditions = [];
    for (const key in queryParams) {
        conditions.push(`${key} = ?`);
    }
    query += conditions.join(' AND ');
    query += ' WHERE id = ?'
    return query
}

export {
    getCommentByConditionQuery,
    getCommentByIdQuery,
    addCommentQuery,
    deleteCommentQuery,
    updateCommentQuery
}