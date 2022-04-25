syncDom = document.getElementById('sync-wrapp');
var db = new PouchDB('models');
var remoteCouch = 'http://127.0.0.1:5984/models';

db.changes({
    since: 'now',
    live: true
}).on('change', fetchModel);

/**
 * Requête de récupération de l'ensemble des todos de l'API
 * @returns une promesse contenant le tableau des todos
 */
function fetchModel() { 
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
        updatePage(doc.rows.map(x => x.doc));
    })
}

/**
 * Requête sur l'API de suppression du todo 
 * @param {number} model à supprimer 
 * @returns une promesse résolue à la suppression en BD
 */
function fetchDeleteModel(model) {
    db.remove(model);
}

/**
 * Requête d'ajout d'un todo dans la BD avec le text précisé
 * @param {string} text 
 * @returns une promesse résolue à l'ajout du todo dans la BD, contenant les données du todo ajouté
 */
function fetchAddModel(text) {
    var model = {
        _id: new Date().toISOString(),
        text: text
    };
    db.put(model, (err, result) => {
        if (!err) {
            console.log('Successfully add model');
        }
    });
}

/**
 * Fonction permettant de faire la synchronisation bidirectionnelle entre
 * la BdD local et le serveur.
 */
function sync() {
    var opts = {live: true};
    db.sync(remoteCouch, opts);
}
