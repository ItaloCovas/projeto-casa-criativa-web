const express = require("express") // require = PRECISA de tal coisa (express para criar e config o servidor)
const server = express()
const db = require("./db")

/* const ideas = [
    {
        img:"https://image.flaticon.com/icons/svg/2731/2731300.svg",
        title:"Cursos de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },

    {
        img:"https://image.flaticon.com/icons/svg/2731/2731275.svg",
        title:"Jogos Online",
        category:"Entretenimento",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },

    {
        img:"https://image.flaticon.com/icons/svg/2731/2731289.svg",
        title:"Receitas Caseiras",
        category:"Receitas",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },

    {
        img:"https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title:"Meditação",
        category:"Bem-Estar",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },

    {
        img:"https://image.flaticon.com/icons/svg/2760/2760528.svg",
        title:"Sobre o Vírus",
        category:"Prevenção",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },

    {
        img:"https://image.flaticon.com/icons/svg/2760/2760670.svg",
        title:"Sobre o Álcool em Gel",
        category:"Higienização",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    }
]  */

// configurar arquivos estáticos (css,scripts,imagens)
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true}))

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, //variável boolean
})

// criei uma rota "/"
// e capturo o pedido do cliente para responder.
server.get("/", function(req, res){ 

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err)
        {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

    const reversedIdeas = [...rows].reverse()
    let lastIdeas = []
        for(let idea of reversedIdeas)
        {
            if(lastIdeas.length < 2)
            {
                lastIdeas.push(idea)
            }
        }
    return res.render("index.html", {ideas: lastIdeas})
    })
})

server.get("/ideias", function(req, res){
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err)
        {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", {ideas: reversedIdeas})
    })
})


server.post("/", function(req,res){ //receber os dados via POST
    //INSERIR DADOS NA TABELA
    
    const query =`
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?)
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err){
        if (err)
        {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")
    })
})

// liguei meu servidor na porta 3000
server.listen(3000)
