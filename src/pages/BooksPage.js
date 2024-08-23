export default function BooksPage() {
  const element = document.createElement('div');

  // Fonction pour charger les livres depuis le fichier JSON dans LocalStorage (si pas déjà chargé)
  const loadBooksFromJSON = async () => {
    if (!localStorage.getItem('books')) {
      try {
        const response = await fetch('/books.json');
        const books = await response.json();
        localStorage.setItem('books', JSON.stringify(books)); // Stocker dans LocalStorage
        displayBooks(books);
      } catch (error) {
        console.error('Erreur lors du chargement des livres :', error);
        element.innerHTML = `<p>Erreur lors du chargement des livres.</p>`;
      }
    } else {
      const books = JSON.parse(localStorage.getItem('books'));
      displayBooks(books);
    }
  };

  // Fonction pour afficher les livres sur la page
  const displayBooks = (books) => {
    let booksList = `
      <div class="container mt-5">
        <h1>Liste des Livres</h1>
        <div class="row">
    `;

    books.forEach((book, index) => {
      const availability = book.quantity > 0 ? 'Disponible' : 'Non disponible';
      const availabilityClass = book.quantity > 0 ? 'text-success' : 'text-danger';
      const bookImage = book.image || 'https://via.placeholder.com/150?text=Aucune+photo';

      booksList += `
        <div class="col-md-4">
          <div class="card mb-4">
            <img src="${bookImage}" class="card-img-top" alt="${book.title}">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text"><strong>Auteur :</strong> ${book.author}</p>
              <p class="card-text"><strong>Genre :</strong> ${book.genre}</p>
              <p class="card-text"><strong>Année :</strong> ${book.year}</p>
              <p class="card-text">${book.description}</p>
              <p class="card-text ${availabilityClass}"><strong>État :</strong> ${availability} (${book.quantity} en stock)</p>
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
        const books = JSON.parse(localStorage.getItem('books'));
        books.splice(bookIndex, 1); // Supprimer le livre
        localStorage.setItem('books', JSON.stringify(books)); // Mettre à jour LocalStorage
        displayBooks(books); // Recharger l'affichage
      });
    });
  };

  // Charger les livres lorsque la page est affichée
  loadBooksFromJSON();

  return element;
}
