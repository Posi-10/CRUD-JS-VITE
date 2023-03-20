import userStore from '../../store/user.store';
import { renderTable } from '../render-table/render-table';
import './render-buttons.css';

/**
 * 
 * @param { HTMLDivElement } element 
 */
export const renderButtons = ( element ) => {

  const nextButton = document.createElement('button');
  nextButton.innerHTML = 'Next ➡';

  const prevButton = document.createElement('button');
  prevButton.innerHTML = '⬅ Prev';

  const currentPageLabel = document.createElement('span');
  currentPageLabel.id = 'current-page';
  currentPageLabel.innerHTML = userStore.getCurrentPage();

  element.append( prevButton, currentPageLabel, nextButton );

  nextButton.addEventListener( 'click', async() => {
    await userStore.loadNextPage();
    currentPageLabel.innerText = userStore.getCurrentPage();
    renderTable( element );
  });

  prevButton.addEventListener( 'click', async() => {
    await userStore.loadPreviousPage();
    currentPageLabel.innerText = userStore.getCurrentPage();
    renderTable( element );
  });
};