syncDom = document.getElementById('sync-wrapp');
var db = new PouchDB('models');
var remoteCouch = 'http://admin:admin@127.0.0.1:5984/models';

db.changes({
    since: 'now',
    live: true
}).on('change', fetchModel);

/**
 * Requête de récupération de l'ensemble des modeles dans la base de donnée
 */
function fetchModel() { 
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
        updatePage(doc.rows.map(x => x.doc));
    })
}

/**
 * Requête sur la base de donnée de suppression du modele 
 * @param model à supprimer 
 */
function fetchDeleteModel(model) {
    db.remove(model);
}

/**
 * Requête d'ajout d'un modele dans la BD avec le text précisé
 * @param {string} text 
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
