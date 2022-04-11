const todosContainer = document.querySelector("section.todos");
const spinner = document.getElementById("spin");
const buttonAdd = document.getElementById("bb");
const trash = document.getElementsByTagName("trash");

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
 * Vide la page web des modeles pour en ajouter de nouveaux
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
 * Ajout d'un modele dans la page web
 * @param {{id, text}} todo à ajouter dans la page web
 */
function appendTodoHtml(todo) {

    const article = document.createElement('article');
    const span = document.createElement('span');
    span.innerText = todo.text;
    article.appendChild(span);
    article.id = 'article' + todo.id;

    article.appendChild(createTrashButton(todo));

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
 * Ajout d'un modele dans la page web
 * @param {{id, text}} todo à ajouter dans la page web
 */
function createTrashButton(todo) {
    /* Creation du bouton de RA */
    const va_icon = document.createElement('button');
    va_icon.type = 'button';
    va_icon.name = 'va';
    va_icon.classList.add('va');
    const span = document.createElement('span');
    span.classList.add('material-icons');
    span.innerHTML = 'view_in_ar';
    va_icon.appendChild(span); 

    /* Creation du bouton poubelle */
    const del = document.createElement('button');
    del.type = 'button';
    del.name = 'del';
    del.classList.add('del')
    const span2 = document.createElement('span');
    span2.classList.add('material-icons');
    span2.innerHTML = 'delete';
    del.appendChild(span2);

    /* Creation du div contenant les options de manipulation */
    const div = document.createElement('div');
    div.type = 'container';
    div.appendChild(va_icon);
    div.appendChild(del); 

    /* L'action que produit le bouton de RA */
    va_icon.onclick=(event) => {
        document.location.href="models/" + todo.text + ".html";
        event.stopPropagation(); 
    };

    /* L'action que produit le bouton de la poubelle */
    del.onclick=(event) => {
        deleteTodo(todo.id, event);
        event.stopPropagation();
    };
   
    return div;

}

/**
 * Suppression du modele de la page web
 * @param {number} id 
 */
function deleteTodoHtml(id) {
    const article = document.querySelector('#article'+id);
    console.log("successfully deleted");         
    todosContainer.removeChild(article);
}


/**
 * Bascule l'application en mode hors ligne si la liste des taches n'a pu etre obtenue
 */
function setOfflineMode() {
    const banner = new mdc.banner.MDCBanner(document.querySelector('.mdc-banner'));
    banner.open()
}
