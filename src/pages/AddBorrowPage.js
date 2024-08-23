export default function AddBorrowPage() {
  const element = document.createElement('div');

  // Fonction pour charger les livres depuis le LocalStorage
  const loadBooks = async () => {
    // Charger les livres depuis LocalStorage
    const books = JSON.parse(localStorage.getItem('books')) || [];
    displayBorrowForm(books); // Afficher le formulaire d'emprunt avec les livres disponibles
  };

  // Fonction pour afficher le formulaire d'emprunt
  const displayBorrowForm = (books) => {
    // Récupérer les membres depuis le LocalStorage
    const members = JSON.parse(localStorage.getItem('members')) || [];

    let bookOptions = '';
    books.forEach((book, index) => {
      if (book.quantity > 0) { // Afficher uniquement les livres disponibles
        bookOptions += `<option value="${index}">${book.title} (Disponible: ${book.quantity})</option>`;
      }
    });

    let memberOptions = '';
    members.forEach((member, index) => {
      memberOptions += `<option value="${index}">${member.firstName} ${member.lastName}</option>`;
    });

    element.innerHTML = `
      <div class="container mt-5">
        <h1>Emprunter un Livre</h1>
        <form id="borrow-form">
          <div class="mb-3">
            <label for="bookSelect" class="form-label">Sélectionnez un livre</label>
            <select class="form-select" id="bookSelect" required>
              ${bookOptions}
            </select>
          </div>
          <div class="mb-3">
            <label for="memberSelect" class="form-label">Sélectionnez un membre</label>
            <select class="form-select" id="memberSelect" required>
              ${memberOptions}
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Valider l'emprunt</button>
        </form>
        <div id="confirmation-message" class="mt-3" style="display: none;">
          <p class="alert alert-success">L'emprunt a été enregistré avec succès !</p>
        </div>
        <div id="error-message" class="mt-3" style="display: none;">
          <p class="alert alert-danger">Le membre a déjà emprunté ce livre !</p>
        </div>
      </div>
    `;

    // Gérer la soumission du formulaire d'emprunt
    element.querySelector('#borrow-form').addEventListener('submit', (e) => {
      e.preventDefault();

      const bookIndex = parseInt(document.getElementById('bookSelect').value, 10);
      const memberIndex = parseInt(document.getElementById('memberSelect').value, 10);

      // Récupérer les emprunts depuis LocalStorage
      const borrows = JSON.parse(localStorage.getItem('borrows')) || [];

      // Vérifier si le membre a déjà emprunté le même livre
      const alreadyBorrowed = borrows.some(
        (borrow) => borrow.bookIndex === bookIndex && borrow.memberIndex === memberIndex && !borrow.actualReturnDate
      );

      if (alreadyBorrowed) {
        // Afficher un message d'erreur si le membre a déjà emprunté ce livre
        document.getElementById('error-message').style.display = 'block';
      } else {
        // Créer un nouvel emprunt
        const newBorrow = {
          bookIndex,
          memberIndex,
          borrowDate: new Date().toISOString().split('T')[0],
          returnDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Date de retour prévue (14 jours plus tard)
          actualReturnDate: null
        };

        // Ajouter l'emprunt aux emprunts existants
        borrows.push(newBorrow);
        localStorage.setItem('borrows', JSON.stringify(borrows));

        // Mettre à jour la quantité du livre dans LocalStorage
        books[bookIndex].quantity -= 1;

        // Vérifier si le livre est épuisé et le retirer du formulaire si c'est le cas
        if (books[bookIndex].quantity === 0) {
          document.querySelector(`#bookSelect option[value="${bookIndex}"]`).remove();
        }

        // Mettre à jour LocalStorage avec la nouvelle quantité de livres
        localStorage.setItem('books', JSON.stringify(books));

        // Afficher le message de confirmation
        document.getElementById('confirmation-message').style.display = 'block';

        // Cacher le message d'erreur au cas où il avait été affiché précédemment
        document.getElementById('error-message').style.display = 'none';

        // Réinitialiser le formulaire
        e.target.reset();
      }
    });
  };

  // Charger les livres lorsque la page est affichée
  loadBooks();

  return element;
}
