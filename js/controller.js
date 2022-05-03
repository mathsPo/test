function getModel() {
    console.log('get modele request');

    clearModel();
    var networkDataReceived = false;
    startSpinner();

    var networkUpdate = fetchModel();
        (data, err) => {
        networkDataReceived = true;
        
        updatePage(data);
        if (err){
            setOfflineMode;
        }
    };
    caches.match(remoteCouch), (response) => {
        if(!response){
            throw Error("No data");
        }
        return response.json();

    }, (data, err) => {
        if(!networkDataReceived){
            updatePage(data);
        }
        if(err){
            () => { return networkUpdate}
        }
        else{
            showErrorMessage;
        }
    },
    stopSpinner();
}

/**
 * Ajout d'un modele dans la base de donnée contenant le text précisé puis ajout dans la page web
 * @param {string} text
 */
function addModel(text) {
    startSpinner();
    console.log('Add model : ', text);

    fetchAddModel(text), (data) => {
        appendModelHtml(data)
    }
    stopSpinner();
}

/**
 * Suppression d'un modele identifié par son id de la base de donnée puis de la page web
 * @param {{id, text}} model à supprimer
 * @param {Event} event déclenché par le clic sur le bouton de suppression
 */
function deleteModel(model, event) {
    startSpinner();
    console.log('Delete model ' + model + ' request');

        fetchDeleteModel(model), () => {
            deleteModelHtml(model);
        }
    stopSpinner();
}
