const API_URL = 'https://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  let fyrirtaeki;
  let container;


  function init(companies) {
    fyrirtaeki = _company;

    container = fyrirtaeki.querySelector('.results');
    form = fyrirtaeki.querySelector('form');
    form.addEventListener('submit', fetch());
  }
  function Loading() {
    empty(results);

    const img = document.createElement('img');
    img.setAttribute('alt', '');
    img.setAttribute('src', 'loading.gif');

    const loading = el('div', img, 'Leita að fyrirtækjum...');
    loading.classList.add('loading');

    results.appendChild(loading);
  }


  function getData(e){
    Loading();
    e.preventDefault();

    fetch(API_URL)
    .then(response => {
      if(!response.ok){
        throw Error("villa");
      }

      return response.json();
      })
      .then(jsonResponse => {
        show(jsonResponse);
      })
      .catch(() => console.error("Þú fékkst villu"));
  }

function show(data) {

  for (const item of data.results) {
    const div = el('div',
     el('d1',
      el('dt','name'),
      el('dd', name),
      el('dt', 'sn'),
      el('dd', sn),
      el('dt', 'active'),
    
      el('dt', 'address'),
      el('dd', address)
    )
    );

    
    container.appendChild(div);
};

debugger;
}

function el(name, ...children)  {
  const element = document.createElement(name);

  for (const child of children) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  }
  return element;
}

function empty(el)  {
  while (el.firstChild)  {
    el.removeChild(el.firstChild);
  }
}

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const companies = document.querySelector('.companies');
  program.init(companies);
});