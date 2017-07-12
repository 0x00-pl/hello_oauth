const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
const { search_to_object, object_to_search } = require('./url_tools')

let app = express()

let client_id = 'b936ba5e6b3e4a4248e5'

let client_secret = '59624a8e573c776d65c75fa8acd52420dbb48436'

let github_auth_addr = 'http://github.com/login/oauth/authorize'
let auth = {
    client_id,
    redirect_uri: 'http://localhost/authed.html'
}

let github_get_token_addr = 'https://github.com/login/oauth/access_token'
let get_token_t = {
    client_id,
    client_secret,
    code: undefined
}

let github_graphql_addr = 'https://api.github.com/graphql'

app.get('/index.html', (req, res)=>{
    res.redirect(github_auth_addr+object_to_search(auth))
})

app.get('/authed.html', (req, res)=>{
    let code = req.query.code
    let get_token = Object.assign({}, get_token_t, {code})
    fetch(
        github_get_token_addr+object_to_search(get_token),
        {method: 'POST', headers: {Accept: 'application/json'}}
    )
        .then(b=>b.json())
        .then(j=>{
            let access_token = j.access_token
            res.redirect('/access.html'+object_to_search({access_token}))
        })
})

app.get('/access.html', (req, res)=>{
    let access_token = req.query.access_token
    let graphql_query = req.query.q
    if (graphql_query) {
        fetch(
            github_graphql_addr,
            {
                method: 'POST',
                headers: {Authorization: 'bearer '+access_token},
                body: JSON.stringify({
                    query: graphql_query
                })
            }
        )
            .then(b=>b.json())
            .then(j=>res.json(j))
            .catch(err=>{
                console.log(err)
                console.dir(err)
                res.end(err)
            })
    } else {
        res.sendFile(path.join(__dirname, 'input_graphql.html'))
    }
})

app.listen(80)
