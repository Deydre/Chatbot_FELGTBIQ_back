const queries = {
    createAdmin: `
    INSERT INTO admin(email, password)
    VALUES ($1,$2,$3)
    `,
    checkLogin: `
    SELECT * FROM admin
    WHERE email = $1 AND password = $2
    `,
    // Buscar el username en el token y mostrar el usuario conectado + Mostrar perfil de usuario concreto ("/users/:id")
    getAdminByEmail: `
    SELECT id, email, password
    FROM admin
    WHERE email=$1;`,
   
}
module.exports = queries;