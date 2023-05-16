import icons from 'url:../../img/icons.svg';
import View from './View';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMsg = 'No bookmarks yet, add nice recipe first';
  _successMsg = '';

  addHandlerRender(handler){
    window.addEventListener('load', handler);
  }

  _generateHtmlMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }

 
}

export default new BookmarksView();
