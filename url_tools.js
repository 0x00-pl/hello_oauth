
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
    return '?'+Object.keys(o).map(k=>`${k}=${o[k]}`).join('&')
}


module.exports = {
    search_to_object,
    object_to_search
}
