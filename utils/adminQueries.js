const queries = {
    createAdmin: `
    INSERT INTO admin_data(email, password)
    VALUES ($1,$2,$3)
    `,
    checkLogin: `
    SELECT * FROM admin_data
    WHERE email = $1 AND password = $2
    `,
    // Buscar el email en el token y mostrar el usuario conectado 
    getAdminByEmail: `
    SELECT admin_id, email, password
    FROM admin_data
    WHERE email=$1;`,
   
}
module.exports = queries;