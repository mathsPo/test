function getTodos() {
    console.log('get todos request');

    clearTodos();
    var networkDataReceived = false;
    startSpinner();

    var networkUpdate = fetchTodos().then(function (data) {
        networkDataReceived = true;
        updatePage(data);
    }).catch(setOfflineMode)
    caches.match(apiUrl).then(function (response) {
        if (!response) throw Error("No data");
        return response.json();
    }).then(function (data) {
        if (!networkDataReceived) {
            updatePage(data);
        }
    }).catch(function () {
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
 * Suppression du todo identifié par id de l'API puis de la page web
 * @param {number} id du todo à supprimer
 * @param {Event} event déclenché par le clic sur le bouton de suppression
 */
function deleteTodo(id, event) {
    console.log('Delete todo ' + id + ' request');

    fetchDeleteTodo(id)
        .then(() => deleteTodoHtml(id));
}
