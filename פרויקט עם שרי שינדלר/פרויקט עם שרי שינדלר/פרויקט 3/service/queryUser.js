
function getUserByIdQuery() {
    const query = `SELECT * FROM ${process.env.DB_NAME}.users  where id = ?`;
    return query
}

function getUserByConditionQuery(queryParams) {
    let query = `SELECT * FROM ${process.env.DB_NAME}.users`;
    if (Object.keys(queryParams).length > 0 ) {
        if( Object.keys(queryParams)[0]!=="_limit" && Object.keys(queryParams)[0]!=="_sort"){
            query += ' WHERE ';
            const conditions = [];
            for (const key in queryParams) {
                if (key !== '_limit' && key !== '_sort') { 
                    conditions.push(`${key} = ?`);
                }
            }
            query += conditions.join(' AND ');    
        }
        if (queryParams._sort) {
        query +=  ` ORDER BY ?`; 

        }
        if (queryParams._limit) {
            query += ' LIMIT ? ';
        }
    }
    console.log(query)
    return query;
   }

function addUserQuery() {
    const query = `INSERT INTO ${process.env.DB_NAME}.users(name,username,phone,email) VALUES (?,?,?,?)`;
    return query
}

function deleteUserQuery() {
    const query = `DELETE FROM ${process.env.DB_NAME}.users WHERE id = ?`;
    return query
}

function updateUserQuery(queryParams) {
    let query = `UPDATE ${process.env.DB_NAME}.users SET `;
    const conditions = [];
    for (const key in queryParams) {
        conditions.push(`${key} = ?`);
    }
    query += conditions.join(' AND ');
    query += ' WHERE id = ?'
    return query
}

export {
    getUserByIdQuery,
    addUserQuery,
    deleteUserQuery,
    updateUserQuery,
    getUserByConditionQuery
}