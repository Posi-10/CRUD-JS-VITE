import { UsersApp } from './src/users/users-app';
import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h2>CRUD</h1>
    <h3>Create-Read-Update-Delete</h2>
    <div class="card">
    </div>
  </div>
`;

const element = document.querySelector('.card');

UsersApp( element );