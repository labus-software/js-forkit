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
