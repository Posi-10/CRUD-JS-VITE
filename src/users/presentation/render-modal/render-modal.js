import modalHTML from './render-modal.html?raw';
import './render-modal.css'
import { getUserById } from '../../use-cases/get-user-by-id.use-case';

let modal, form;
let loaderUser = '';

/**
 * 
 * @param { String | Number } id 
 */
export const showModal = async ( id ) => {

  modal?.classList.remove('hide-modal');
  
  loaderUser = {};

  if( !id ) return;

  const user = await getUserById( id );
  setFormValues( user );

};

/**
 * 
 * @param { User } user 
 */
export const hideModal = ( user ) => {

  modal?.classList.add('hide-modal');

  form?.reset();

};

/**
 * 
 * @param { User } user 
 */
const setFormValues = ( user ) => {

  form.querySelector('[name="firstName"]').value = user.firstName;
  form.querySelector('[name="lastName"]').value = user.lastName;
  form.querySelector('[name="balance"]').value = user.balance;
  form.querySelector('[name="isActive"]').checked = user.isActive;

  loaderUser = user;
}

/**
 * 
 * @param { HTMLDivElement } element
 * @param { ( userLike ) => Promise<void> } callback
 */
export const renderModal = ( element, callback ) => {

  if( modal ) return;

  modal = document.createElement('div');
  modal.innerHTML = modalHTML;
  modal.className = 'modal-container hide-modal';

  form = modal.querySelector('form');

  modal.addEventListener( 'click', ( event ) => {

    if( event.target.className === 'modal-container' ){
      
      hideModal();

    }

  });

  form.addEventListener( 'submit', async ( event ) => {

    event.preventDefault();

    const formData = new FormData( form );
    const userLike = { ...loaderUser };

    for( const [key, value] of formData ){
      
      if( key === 'balance' ){

        userLike[key] = +value; // ó data[key] = Number(value);
        continue;

      }

      if( key === 'isActive' ){

        userLike[key] = ( value === 'on' ) && true;
        continue;

      }else{

        userLike['isActive'] = false;

      }

      userLike[key] = value;

    }

    await callback( userLike );

    hideModal();

  });

  element.append( modal );
};
