import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderErrorMsg();
    
    this._data = data;
    const markup = this._generateHtmlMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  
  update(data){
    // if(!data || (Array.isArray(data) && data.length === 0)) return this.renderErrorMsg();
    this._data = data;

    const newMarkup = this._generateHtmlMarkup();

    const virtualDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(virtualDOM.querySelectorAll('*'));

    const currentELements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newElement, i) => {
      const currentElement = currentELements[i];

      // updates TEXT
      if(!newElement.isEqualNode(currentElement) && newElement.firstChild?.nodeValue.trim() !== ''){
        currentElement.textContent = newElement.textContent;
      }

      // updates ATTRIBUTES

      if(!newElement.isEqualNode(currentElement)){
        Array.from(newElement.attributes).forEach(attr => {
          currentElement.setAttribute(attr.name, attr.value);
        })
      }
    })
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  spinner = () => {
    const html = `
        <div class="spinner">
        <svg>
          <use href="${icons}.svg#icon-loader"></use>
        </svg>
      </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  };

  renderErrorMsg(msg = this._errorMsg) {
    const html = `
    <div class="error">
            <div>
              <svg>
                <use href="src/img/${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
  renderSuccessMsg(msg = this._successMsg) {
    const html = `
    <div class="message">
            <div>
              <svg>
                <use href="src/img/${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}
