import icons from 'url:../../img/icons.svg';
import View from './View';
import previewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = 'Our cheef could not find that one in his almanac!';
  _successMsg = '';

  _generateHtmlMarkup() {
    return this._data
      .map(item => previewView.render(item, false))
      .join('');
  }

  // _generateHtmlMarkupPreview(result) {

  //   const id = window.location.hash.slice(1);

  //   return `
  //       <li class="preview">
  //           <a class="preview__link ${result.id === id ? 'preview__link--active' : ''}" href="#${result.id}">
  //             <figure class="preview__fig">
  //               <img src="${result.image}" alt="${result.title}" />
  //             </figure>
  //             <div class="preview__data">
  //               <h4 class="preview__title">${result.title}</h4>
  //               <p class="preview__publisher">${result.publisher}</p>
  //               <div class="preview__user-generated">
  //                 <svg>
  //                   <use href="${icons}#icon-user"></use>
  //                 </svg>
  //               </div>
  //             </div>
  //           </a>
  //         </li>
  //       `;
  // }
}

export default new ResultsView();
