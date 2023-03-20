import { loadUsersByPage } from "../use-cases/load-users-by-pages.use-cases";

const state = {
  currentPage: 0,
  users: [],
};

const loadNextPage = async() => {

  const users = await loadUsersByPage( state.currentPage + 1 );

  if( users.length === 0 ) return;

  state.currentPage += 1;
  state.users = users;

};

const loadPreviousPage = async() => {
  
  if( state.currentPage === 1 ) return;
  
  const users = await loadUsersByPage( state.currentPage - 1 );
  
  state.currentPage -= 1;
  state.users = users;
  
};

/**
 * 
 * @param { User } user 
 */
const onUserChanged = ( updateUser ) => {

  let wasFound = false;
  
  state.users = state.users.map( user => {

    if( user.id === updateUser.id ){

      wasFound =  true

      return updateUser;

    }

    return user;

  });

  if( state.users.length < 10 ){

    state.users.push( updateUser );

  }

};

const reloadPage = async() => {
  
  const users = await loadUsersByPage( state.currentPage );

  if( users.length === 0 ){

    await loadPreviousPage();
    
    return;
  
  };

  state.users = users;

};

export default {
  /**
   * 
   * @returns { Number }
   */
  getCurrentPage: () => state.currentPage,
  /**
   * 
   * @returns { User[] }
   */
  getUsers: () => [...state.users],
  loadNextPage,
  loadPreviousPage,
  onUserChanged,
  reloadPage,
}