export default function BooksPage() {
  const element = document.createElement('div');

  // Récupérer les livres depuis LocalStorage
  const books = JSON.parse(localStorage.getItem('books')) || [];

  let booksList = `
    <div class="container mt-5">
      <h1>Liste des Livres</h1>
      <div class="row">
  `;

  books.forEach(book => {
    const availability = book.quantity > 0 ? 'Disponible' : 'Non disponible';
    const availabilityClass = book.quantity > 0 ? 'text-success' : 'text-danger';

    // Utiliser l'image du livre ou une image par défaut si aucune image n'est fournie
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

  return element;
}
