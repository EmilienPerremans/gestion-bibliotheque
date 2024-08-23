export default function EditBookPage() {
  const params = new URLSearchParams(window.location.search);
  const bookIndex = params.get('index');
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const book = books[bookIndex];

  const element = document.createElement('div');

  if (!book) {
    element.innerHTML = `
      <div class="container mt-5">
        <h1>Modifier Livre</h1>
        <p>Erreur : Le livre n'existe pas.</p>
      </div>
    `;
    return element;
  }

  element.innerHTML = `
    <div class="container mt-5">
      <h1>Modifier Livre</h1>
      <form id="edit-book-form">
        <div class="mb-3">
          <label for="title" class="form-label">Titre</label>
          <input type="text" class="form-control" id="title" value="${book.title}" required>
        </div>
        <div class="mb-3">
          <label for="author" class="form-label">Auteur</label>
          <input type="text" class="form-control" id="author" value="${book.author}" required>
        </div>
        <div class="mb-3">
          <label for="genre" class="form-label">Genre</label>
          <input type="text" class="form-control" id="genre" value="${book.genre}" required>
        </div>
        <div class="mb-3">
          <label for="year" class="form-label">Année de publication</label>
          <input type="number" class="form-control" id="year" value="${book.year}" required>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" id="description" rows="3" required>${book.description}</textarea>
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">URL de l'image</label>
          <input type="text" class="form-control" id="image" value="${book.image}">
        </div>
        <div class="mb-3">
          <label for="quantity" class="form-label">Quantité</label>
          <input type="number" class="form-control" id="quantity" value="${book.quantity}" required>
        </div>
        <button type="submit" class="btn btn-primary">Enregistrer les modifications</button>
      </form>
    </div>
  `;

  // Gérer la soumission du formulaire pour modifier un livre
  element.querySelector('#edit-book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Mettre à jour les informations du livre
    books[bookIndex] = {
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      genre: document.getElementById('genre').value,
      year: document.getElementById('year').value,
      description: document.getElementById('description').value,
      image: document.getElementById('image').value,
      quantity: parseInt(document.getElementById('quantity').value, 10)
    };

    // Mettre à jour le LocalStorage avec les nouvelles informations
    localStorage.setItem('books', JSON.stringify(books));

    // Rediriger vers la liste des livres
    window.history.pushState(null, '', '/books');
    window.dispatchEvent(new Event('popstate'));
  });

  return element;
}
