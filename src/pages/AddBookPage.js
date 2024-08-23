export default function AddBookPage() {
  const element = document.createElement('div');

  element.innerHTML = `
    <div class="container mt-5">
      <h1>Ajouter un Livre</h1>
      <form id="book-form">
        <div class="mb-3">
          <label for="title" class="form-label">Titre</label>
          <input type="text" class="form-control" id="title" required>
        </div>
        <div class="mb-3">
          <label for="author" class="form-label">Auteur</label>
          <input type="text" class="form-control" id="author" required>
        </div>
        <div class="mb-3">
          <label for="genre" class="form-label">Genre</label>
          <input type="text" class="form-control" id="genre" required>
        </div>
        <div class="mb-3">
          <label for="year" class="form-label">Année de publication</label>
          <input type="number" class="form-control" id="year" required>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" id="description" rows="3" required></textarea>
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">URL de l'image</label>
          <input type="text" class="form-control" id="image">
        </div>
        <div class="mb-3">
          <label for="quantity" class="form-label">Quantité</label>
          <input type="number" class="form-control" id="quantity" required>
        </div>
        <button type="submit" class="btn btn-primary">Ajouter le Livre</button>
      </form>
      <div id="confirmation-message" class="mt-3" style="display: none;">
        <p class="alert alert-success">Le livre a été ajouté avec succès !</p>
      </div>
    </div>
  `;

  element.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupérer les valeurs du formulaire
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const year = parseInt(document.getElementById('year').value, 10);
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value || 'https://via.placeholder.com/150?text=Aucune+photo';
    const quantity = parseInt(document.getElementById('quantity').value, 10);

    // Créer un nouvel objet livre
    const newBook = {
      title,
      author,
      genre,
      year,
      description,
      image,
      quantity
    };

    // Récupérer les livres actuels depuis LocalStorage
    const books = JSON.parse(localStorage.getItem('books')) || [];

    // Ajouter le nouveau livre à la liste
    books.push(newBook);

    // Mettre à jour LocalStorage
    localStorage.setItem('books', JSON.stringify(books));

    // Afficher le message de confirmation
    document.getElementById('confirmation-message').style.display = 'block';

    // Réinitialiser le formulaire
    e.target.reset();
  });

  return element;
}
