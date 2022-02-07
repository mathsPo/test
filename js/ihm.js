const todosContainer = document.querySelector("section.todos");
const form = document.querySelector("form");
const spinner = document.getElementById("spin");

/**
 * Ajout d'un spinner au chargement de la page
 */
function startSpinner(){
    spinner.classList.remove('hidden');
}

/**
 * Suppression du spinner
 */
function stopSpinner(){
    window.setTimeout(function(){
        spinner.classList.add('hidden');
    }, 300)

}

/**
 * Vide la page web des todos pour en ajouter de nouveaux
 * @param todos liste des nouveaux todos
 */
function updatePage(todos){
    clearTodos()
    todos.forEach(todo => appendTodoHtml(todo))
}

/**
 * Affiche un message d'erreur si aucune donnée n'a pu etre recup
 * @param error
 * @returns {null}
 */
function showErrorMessage(error){
    error = 'Aucune donnée n\'a pu etre recuperé sur le reseaux, affichage des données contenue dans le cache';
    return alert(error);
}

/**
 * Après le chargement de la page
 */
window.addEventListener('load', () => {
    getTodos();

    const formAdd = document.forms['addTodo'];    
    formAdd.addEventListener('submit', event => {
        event.preventDefault();
        const text = formAdd.todo.value;
        if (text) {
            formAdd.todo.value = '';

            addTodo(text);
        }
    });
});

/**
 * Ajout d'un todo dans la page web
 * @param {{id, done, text}} todo à ajouter dans la page web
 */
function appendTodoHtml(todo) {
    const article = document.createElement('article');
    const span = document.createElement('span');
    span.innerText = todo.text;
    article.appendChild(span);
    article.id = 'article' + todo.id;

    article.appendChild(createTrashButton(todo.id));

    if (todo.done) {
        article.classList.add('done');
    }

    article.addEventListener('click', () => toggleTodo(todo.id, article.classList.contains('done')));

    todosContainer.appendChild(article);
}

/**
 * Supprime tous les fils d'un élément HTML
 * @param {htmlElement} htmlElement 
 */
function emptyElement(htmlElement) {
    while (htmlElement.firstChild) {
        htmlElement.removeChild(htmlElement.firstChild);
    }
}

/**
 * Supprime tous les articles du DIV todosContainer
 */
function clearTodos() {
    emptyElement(todosContainer);
}

/**
 * Création d'un bouton de type 'poubelle' déclenchant la suppression du todo identifié par id
 * @param {number} id du todo à supprimer
 * @returns l'élément HTML correspondant au bouton créé
 */
function createTrashButton(id) {
    const trash = document.createElement('input');
    trash.type = 'button';
    trash.name = 'trash';
    trash.value = '🗑';

    trash.addEventListener('click', (event) => {
        event.stopPropagation();

        deleteTodo(id, event);
    });
    
    return trash;
}

/**
 * Suppression du todo de la page web
 * @param {number} id 
 */
function deleteTodoHtml(id) {
    const article = document.querySelector('#article'+id);
    todosContainer.removeChild(article);
}

/**
 * Met à jour l'état du todo id dans la page web
 * @param {number} id identifiant du todo
 * @param {boolean} done état du todo
 */
function toggleTodoHtml(id, done) {
    const article = document.querySelector('#article'+id);
    article.classList.toggle('done', done);
}
