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

    article.onclick= () => toggleTodo(todo.id, article.classList.contains('done'));

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
 * Création d'un bouton de type 'visualisation RA' déclenchant la redurection vers une autre page identifié par id
 * Création d'un bouton de type 'poubelle' déclenchant la suppression du todo identifié par id
 *  @param todos à ajouter dans la page web
 * @returns l'élément HTML correspondant au bouton créé
 */
function createTrashButton(id) {
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
        document.location.href="models/modele" + id + ".html";
        event.stopPropagation(); 
    };

    /* L'action que produit le bouton de la poubelle */
    del.onclick=(event) => {
        deleteTodo(id, event);
        event.stopPropagation();
    };
   
    return div;

}

/**
 * Suppression du todo de la page web
 * @param {number} id 
 */
function deleteTodoHtml(id) {
    const article = document.querySelector('#article'+id);
    console.log("delete succeful");         
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

/**
 * Bascule l'application en mode hors ligne si la liste des taches n'a pu etre obtenue
 */
function setOfflineMode() {
    const banner = new mdc.banner.MDCBanner(document.querySelector('.mdc-banner'));
    banner.open()
}

function disabledTodoActions() {
    buttonAdd.disabled = true;
    document.getElementById("button").disabled = true;
    document.getElementById('todo'). disabled = true;
    const poubelles = document.querySelectorAll(".trash");
    const articles = document.querySelectorAll("article");


    poubelles.forEach((poubelle) => {
        (poubelle.onclick = () => {})
        })

    articles.forEach((article) => {
        (article.onclick = () => {})
        })
}
