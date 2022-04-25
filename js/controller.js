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
 * Ajout d'un todo dans l'API contenant le text précisé puis ajout dans la page web
 * @param {string} text
 */
function addModel(text) {
    console.log('Add model : ', text);

    fetchAddModel(text), (data) => {
        appendModelHtml(data)
    }
}

/**
 * Suppression du todo identifié par id de l'API puis de la page web
 * @param {{id, text}} model du todo à supprimer
 * @param {Event} event déclenché par le clic sur le bouton de suppression
 */
function deleteModel(model, event) {
    console.log('Delete model ' + model + ' request');

        fetchDeleteModel(model), () => {
            deleteModelHtml(model);
        }
}
