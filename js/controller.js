function getTodos() {
    console.log('get todos request');

    clearTodos();
    var networkDataReceived = false;
    startSpinner();

    var networkUpdate = fetchTodos();
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
    }, stopSpinner;

}

/**
 * Ajout d'un todo dans l'API contenant le text précisé puis ajout dans la page web
 * @param {string} text
 */
function addTodo(text) {
    console.log('Add todo : ', text);

    fetchAddTodo(text), (data) => {
        appendTodoHtml(data)
    }
}

/**
 * Suppression du todo identifié par id de l'API puis de la page web
 * @param {{id, text}} todo du todo à supprimer
 * @param {Event} event déclenché par le clic sur le bouton de suppression
 */
function deleteTodo(todo, event) {
    console.log('Delete todo ' + todo + ' request');

        fetchDeleteTodo(todo), () => {
            deleteTodoHtml(todo);
        }
}
