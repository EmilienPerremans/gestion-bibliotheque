export default function BooksPage() {
  const element = document.createElement('div');

  // CSS pour définir la taille des images
  const styles = `
    <style>
      .book-image {
        width: 150px; /* Largeur fixe */
        height: 200px; /* Hauteur fixe */
        object-fit: cover; /* Pour que l'image soit redimensionnée en fonction de la taille définie tout en gardant ses proportions */
      }
    </style>
  `;

  // Nombre de livres par page
  const booksPerPage = 5;
  let currentPage = 1;

  // Fonction pour charger les livres depuis le fichier JSON
  const loadBooks = async () => {
    try {
      const response = await fetch('/books.json'); // Charger le fichier JSON
      const books = await response.json();
      displayBooks(books); // Afficher les livres avec pagination
    } catch (error) {
      console.error('Erreur lors du chargement des livres :', error);
      element.innerHTML = `<p>Erreur lors du chargement des livres.</p>`;
    }
  };

  // Fonction pour afficher les livres d'une page donnée
  const displayBooks = (books) => {
    const totalPages = Math.ceil(books.length / booksPerPage);
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToDisplay = books.slice(startIndex, endIndex);

    let booksList = `
      ${styles} <!-- Injecter les styles CSS -->
      <div class="container mt-5">
        <h1>Liste des Livres</h1>
        <div class="row">
    `;

    booksToDisplay.forEach(book => {
      const availability = book.quantity > 0 ? 'Disponible' : 'Non disponible';
      const availabilityClass = book.quantity > 0 ? 'text-success' : 'text-danger';
      const bookImage = book.image || 'https://via.placeholder.com/150?text=Aucune+photo';

      booksList += `
        <div class="col-md-4">
          <div class="card mb-4">
            <img src="${bookImage}" class="card-img-top book-image" alt="${book.title}">
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
      <div class="pagination mt-4 d-flex justify-content-center">
        ${generatePaginationButtons(totalPages)}
      </div>
    `;

    element.innerHTML = booksList;

    // Ajouter les événements de clic pour les boutons de pagination
    element.querySelectorAll('.pagination-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        currentPage = parseInt(e.target.getAttribute('data-page'), 10);
        displayBooks(books); // Recharger l'affichage des livres pour la page sélectionnée
      });
    });
  };

  // Fonction pour générer les boutons de pagination
  const generatePaginationButtons = (totalPages) => {
    let buttons = '';
    for (let i = 1; i <= totalPages; i++) {
      buttons += `
        <button class="btn btn-secondary mx-1 pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
          ${i}
        </button>
      `;
    }
    return buttons;
  };

  // Charger les livres lorsque la page est affichée
  loadBooks();

  return element;
}
