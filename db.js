const sqlite3 = require('sqlite3').verbose() //verbose serve pra trazer mensagens pro desenvolvedor, no terminal
const db = new sqlite3.Database('./Workshop.db')

db.serialize(function(){

    //CRIAR A TABELA (usei a crase pra poder organizar melhor o código)

    db.run(`
    CREATE TABLE IF NOT EXISTS ideas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        title TEXT,
        category TEXT,
        description TEXT,
        link TEXT
    );
    
    `)

    /* //INSERIR DADOS NA TABELA
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `
            
    const values = [
        "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        "Cursos de Programação",
        "Estudo",
        "Lorem ipsum etc",
        "https://rocketseat.com.br"
    ]

  //essa function é um "CALLBACK", para mostrar quando os dados forem inseridos na DB.
    db.run(query, values, function(err){
        if (err) return console.log(err)

        console.log(this)
    }) */
     
    //DELETAR UM DADO DA TABELA

    /* db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err){
        if (err)
        {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        
        console.log("DELETEI", this)
    }) */

    //CONSULTAR DADOS NA TABELA

    /* db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err)
        {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        console.log(rows)
    }) */
})

module.exports = db