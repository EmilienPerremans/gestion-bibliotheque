export default function BooksPage() {
  const element = document.createElement('div');

  // Récupérer les livres depuis LocalStorage
  const books = JSON.parse(localStorage.getItem('books')) || [];

  let booksList = `
    <div class="container mt-5">
      <h1>Liste des Livres</h1>
      <div class="row">
  `;

  books.forEach((book, index) => {
    const availability = book.quantity > 0 ? 'Disponible' : 'Non disponible';
    const availabilityClass = book.quantity > 0 ? 'text-success' : 'text-danger';

    booksList += `
      <div class="col-md-4">
        <div class="card mb-4">
          <img src="${book.image}" class="card-img-top" alt="${book.title}">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text"><strong>Auteur :</strong> ${book.author}</p>
            <p class="card-text"><strong>Genre :</strong> ${book.genre}</p>
            <p class="card-text"><strong>Année :</strong> ${book.year}</p>
            <p class="card-text">${book.description}</p>
            <p class="card-text ${availabilityClass}"><strong>État :</strong> ${availability} (${book.quantity} en stock)</p>
            <button class="btn btn-primary edit-book-btn" data-index="${index}">Modifier</button>
            <button class="btn btn-danger delete-book-btn" data-index="${index}">Supprimer</button>
          </div>
        </div>
      </div>
    `;
  });

  booksList += `
      </div>
    </div>
  `;

  element.innerHTML = booksList;

  // Gérer la suppression d'un livre
  element.querySelectorAll('.delete-book-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      const bookIndex = e.target.getAttribute('data-index');
      books.splice(bookIndex, 1); // Supprimer le livre de la liste
      localStorage.setItem('books', JSON.stringify(books)); // Mettre à jour le LocalStorage
      window.location.reload(); // Recharger la page pour mettre à jour l'affichage
    });
  });

  // Gérer la modification d'un livre (rediriger vers une page de modification)
  element.querySelectorAll('.edit-book-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      const bookIndex = e.target.getAttribute('data-index');
      window.history.pushState(null, '', `/edit-book?index=${bookIndex}`);
      window.dispatchEvent(new Event('popstate')); // Charger la page de modification
    });
  });

  return element;
}
