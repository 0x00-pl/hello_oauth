
let login_query = 'http://github.com/login/oauth/authorize?client_id=8a3fbd128bb7226f4ac9&redirect_uri=https://0x00-pl.github.io/hello_oauth/&state=rand'

let auth_1 = {
    client_id: '8a3fbd128bb7226f4ac9',
    redirect_uri: 'https://0x00-pl.github.io/hello_oauth/',
    state: 'rand'
}
let github_auth_base = 'http://github.com/login/oauth/authorize'

function search_to_object (q) {
    if (q[0]=='?') {
        q = q.substr(1)
    }
    let ret = {}
    q.split('&').forEach(kv=>{
        let [k, v] = kv.split('=')
        ret[k] = v
    })
    return ret
}

function object_to_search (o) {
    return '?'+Object.keys(o).map(k=>"${k}=${o[k]}").join('&')
}


