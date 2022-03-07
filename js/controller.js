/**
 * Récupération des todos de l'API et insertion dans la page web
 */
function getTodos() {
    console.log('get todos request');

    clearTodos();
    var networkDataReceived = false;
    startSpinner();

// fetch fresh data
    var networkUpdate = fetchTodos().then(function (data) {
        networkDataReceived = true;
        updatePage(data);
    }).catch(setOfflineMode)
        .catch(disabledTodoActions)
    // fetch cached data
    caches.match(apiUrl).then(function (response) {
        if (!response) throw Error("No data");
        return response.json();
    }).then(function (data) {
        // don't overwrite newer network data
        if (!networkDataReceived) {
            updatePage(data);
        }
    }).catch(function () {
        // we didn't get cached data, the network is our last hope:
        return networkUpdate;
    }).catch(showErrorMessage)
        .then(stopSpinner);
}

/**
 * Ajout d'un todo dans l'API contenant le text précisé puis ajout dans la page web
 * @param {string} text
 */
function addTodo(text) {
    console.log('Add todo : ', text);

    fetchAddTodo(text)
        .then(data => {
            appendTodoHtml(data);
        });
}

/**
 * Basculement du todo identifié par id d'un état réalisé à un état non réalisé ou inversement dans l'API puis dans la page web
 * @param {number} id identifie le todo
 * @param {boolean} done état initial du todo
 */
function toggleTodo(id, done) {
    console.log('Toggle todo ' + id + ' request');

    fetchToggleTodo(id, !done)
        .then(data => toggleTodoHtml(id, data.done));
}

/**
 * Suppression du todo identifié par id de l'API puis de la page web
 * @param {number} id du todo à supprimer
 * @param {Event} event déclenché par le clic sur le bouton de suppression
 */
function deleteTodo(id, event) {
    console.log('Delete todo ' + id + ' request');

    fetchDeleteTodo(id)
        .then(() => deleteTodoHtml(id));
}
