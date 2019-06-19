const express = require('express')
const path = require('path')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs') // Declarando handlebars
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Criando rotas para aplicação utilizando Express
app.get('', (req, res) => {
    res.render('index',{
        title: 'Bem vindo ao sistema de cotações',
        author: 'Jason Bonatelli'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Sobre',
        author: 'Jason Bonatelli'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Conteúdo de ajuda',
    })
})

app.get('/cotacoes', (req, res) => {
    if(!req.query.ativo) {
        return res.status(400).json({
            error: {
                mensage: 'Ativo necessita ser informado',
                code: 400
            }
        })
    }

    const symbol = req.query.ativo.toUpperCase()
    
    cotacoes(symbol, (err, body) => {
        if(err) {
            return res.status(err.code).json({error: {
                mensage: err.mensage,
                code: err.code
            }})
        }
        
        res.status(200).json(body)
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Página não encontrada'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Página não encontrada'
    })
})

app.listen(3000, () => {
    console.log('Running on port 3000')
})