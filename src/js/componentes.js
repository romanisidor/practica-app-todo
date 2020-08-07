
//Referencias en el HTML

import { Todo, TodoList } from "../classes";

import { todoList } from '../index'

const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo')
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) =>{

    const htmlTodo = `
    <li class=" ${(todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox"  ${(todo.completado) ? 'checked' : '' }>
        <label>${ todo.tarea }</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );


    return div.firstElementChild;


}


//Eventos

txtInput.addEventListener('keyup' , (event) =>{
     
    if (event.keyCode === 13 && txtInput.value.length > 0){

        const nuevoTodo = new Todo(txtInput.value);

        todoList.nuevoTodo (nuevoTodo);

        crearTodoHtml(nuevoTodo);

        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName //input, label, button

    const todoElemento = event.target.parentElement.parentElement;

    const todoId = todoElemento.getAttribute('data-id');
    
    
    if ( nombreElemento.includes('input') ) { //click en el check
        
         todoList.marcarCompletado(todoId);

         todoElemento.classList.toggle('completed');
        
    } else if(nombreElemento.includes('button')){
        
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
    
 

});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    //Orden ascendente en el barrido del array

    for ( let i = divTodoList.children.length-1; i>= 0; i--){
        
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if( !filtro ){ return; }



    for( const elemento of divTodoList.children ) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

         anchorFiltros.forEach (elem => elem.classList.remove('selected'));
         event.target.classList.add('selected');

        switch( filtro ) {

            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;

        }


    }



});
//keyup -> Sirve para saber cuando usuario suelta la tecla

//firstElementChild

//Sirve para inserte el segundo elemento del elemento padre, ejemplo 

/*
    <div>
     <li>
        //En este caso solo se insertaría la etiqueta li
     </li>   
    </div>

*/