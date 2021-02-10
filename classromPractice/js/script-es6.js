'use strict'; /* O javascript acusa mais erros */

let globalNames = ['Um', 'Dois', 'Três', 'Quatro', 'Cinco'];
let inputName = null;
let currentIndex = null;
let isEditing = false;

window.addEventListener('load', () => {
   inputName = document.querySelector('#inputName');
   
   preventFormSubmit();
   activateInput();
   render();
});

const preventFormSubmit = () => {
   const handleFormSubmit = (event) => {
      event.preventDefault();
   }
   
   let form = document.querySelector('form');
   form.addEventListener('submit', handleFormSubmit);
}

const activateInput = () => {
   const insertName = (newName) => {
      // globalNames.push(newName);
      globalNames = [...globalNames, newName];
   }

   const updateName = (newName) => {
      globalNames[currentIndex] = newName;
   }

   const handleTyping = (event) => {
      let hasText = !!event.target.value && event.target.value.trim() !== '';
      
      if (!hasText) {
         clearInput();
         return;
      }
      
      if (event.key === 'Enter') {
         if (isEditing) {
            updateName(event.target.value);
         } else {
            insertName(event.target.value);
         }

         render();
         isEditing = false;
         clearInput();
      }
   }

   inputName.addEventListener('keyup', handleTyping);
   inputName.focus();
}


const render = () => {
   const createDeleteButton = (index) => {
      const deleteName = () => {
         // globalNames.splice(index, 1);

         /* globalNames = globalNames.filter((name, i) => {
            //if (i === index) {
               // return false;
            // }
            // return true;
            return i !== index
         }); */

         globalNames = globalNames.filter((_, i) => i !== index);

         render();
      }

      let button = document.createElement('button');
      button.classList.add('deleteButton');
      button.textContent = 'X';
      
      button.addEventListener('click', deleteName);
      
      return button;
   }
   
   const createSpan = (name, index) => {
      const editItem = () => {
         inputName.value = name;
         inputName.focus();
         isEditing = true;
         currentIndex = index;
      }
      
      var span = document.createElement('span');
      span.classList.add('clickable');
      span.textContent = currentName;
      span.addEventListener('click', editItem);

      return span;
   }

   var divNames = document.querySelector('#names');
   divNames.innerHTML = '';
   
   //Criar ul
   //Fazer n li's, conforme tamanho de globalNames
   var ul = document.createElement('ul');
   
   for (var i = 0; i < globalNames.length; i++) {
      var currentName = globalNames[i];

      var li = document.createElement('li');
      var button = createDeleteButton(i);
      var span = createSpan(currentName, i);

      li.appendChild(button);
      li.appendChild(span);
      
      ul.appendChild(li);
   }

   divNames.appendChild(ul);
   clearInput();
}

const clearInput = () => { 
   inputName.value = '';
   inputName.focus();
}
