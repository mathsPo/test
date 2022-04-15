syncDom = document.getElementById('sync-wrapp');
var db = new PouchDB('todos');
var remoteCouch = 'http://localhost:5984/todos';

db.changes({
    since: 'now',
    live: true
}).on('change', fetchTodos);

/**
 * Requête de récupération de l'ensemble des todos de l'API
 * @returns une promesse contenant le tableau des todos
 */
function fetchTodos() {
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
        updatePage(doc.rows.map(x => x.doc));
    })
}

/**
 * Requête sur l'API de suppression du todo 
 * @param {number} todo à supprimer 
 * @returns une promesse résolue à la suppression en BD
 */
function fetchDeleteTodo(todo) {
    db.remove(todo);
}

/**
 * Requête d'ajout d'un todo dans la BD avec le text précisé
 * @param {string} text 
 * @returns une promesse résolue à l'ajout du todo dans la BD, contenant les données du todo ajouté
 */
function fetchAddTodo(text) {
    var todo = {
        _id: new Date().toISOString(),
        text: text
    };
    db.put(todo, (err, result) => {
        if (!err) {
            console.log('Successfully add todo');
        }
    });
}

/**
 * Fonction permettant de faire la synchronisation bidirectionnelle entre
 * la BdD local et le serveur.
 */
function sync() {
    syncDom.setAttribute('data-sync-state', 'syncing');
    var opts = {live: true};
    db.sync(remoteCouch, opts, syncError);
}

function syncError() {
    syncDom.setAttribute('data-sync-state', 'error');
}