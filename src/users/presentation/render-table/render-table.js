import userStore from '../../store/user.store';
import { deleteUser } from '../../use-cases/delete-user-by-id.use-case';
import { showModal } from '../render-modal/render-modal';
import './render-table.css';

let table;

const createTable = () => {

  const table = document.createElement('table');

  const tableHeaders = document.createElement('thead');
  tableHeaders.innerHTML = `
    <tr>
      <th scope="col">#ID</th>
      <th scope="col">Balance</th>
      <th scope="col">FirstName</th>
      <th scope="col">LastName</th>
      <th scope="col">Active</th>
      <th scope="col">Actions</th>
    </tr>
  `;

  const tableBody = document.createElement('tbody');

  table.append( tableHeaders, tableBody );
  
  return table;

};

/**
 * 
 * @param { MouseEvent } event 
 * @returns 
 */
const tableSelectListener = ( event ) => {

  const element = event.target.closest('.select-user');

  if( !element ) return;

  const id = element.getAttribute('data-id');
  showModal( id );
}

/**
 * 
 * @param { MouseEvent } event 
 * @returns 
 */
const tableDeleteListener = async ( event ) => {

  const element = event.target.closest('.delete-user');

  if( !element ) return;

  const id = element.getAttribute('data-id');
  
  try {
    
    await deleteUser( id );
    await userStore.reloadPage();
    document.querySelector('#current-page').innerText = userStore.getCurrentPage();
    renderTable();

  } catch (error) {
    
    alert('No se puede eliminar');

  }
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = ( element ) => {

  const users = userStore.getUsers();

  if( !table ) {
    table = createTable();
    element.append( table );

    table.addEventListener( 'click', tableSelectListener );
    table.addEventListener( 'click', tableDeleteListener );
  }

  let tableHTML = '';
  
  users.forEach( user => {
    tableHTML += `
      <tr>
        <th scope="row">${ user.id }</th>
        <td>${ user.balance }</td>
        <td>${ user.firstName }</td>
        <td>${ user.lastName }</td>
        <td>${ user.isActive }</td>
        <td>
          <a herf="#/" class="select-user" data-id="${ user.id }">Select</a>
          |
          <a herf="#/" class="delete-user" data-id="${ user.id }">Delete</a>
        </td>
      </tr>
    `;
  });

  table.querySelector('tbody').innerHTML = tableHTML;
};