export default function AddBorrowPage() {
  const element = document.createElement('div');

  // Récupérer les membres et les livres depuis LocalStorage
  const members = JSON.parse(localStorage.getItem('members')) || [];
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const borrows = JSON.parse(localStorage.getItem('borrows')) || [];

  // Construire la liste des membres et des livres disponibles
  let memberOptions = '';
  members.forEach((member, index) => {
    memberOptions += `<option value="${index}">${member.firstName} ${member.lastName}</option>`;
  });

  let bookOptions = '';
  books.forEach((book, index) => {
    if (book.quantity > 0) {
      bookOptions += `<option value="${index}">${book.title} par ${book.author} (disponible: ${book.quantity})</option>`;
    }
  });

  element.innerHTML = `
    <div class="container mt-5">
      <h1>Ajouter un Emprunt</h1>
      <form id="borrow-form">
        <div class="mb-3">
          <label for="member" class="form-label">Membre</label>
          <select class="form-select" id="member" required>
            <option value="">Sélectionnez un membre</option>
            ${memberOptions}
          </select>
        </div>
        <div class="mb-3">
          <label for="book" class="form-label">Livre</label>
          <select class="form-select" id="book" required>
            <option value="">Sélectionnez un livre</option>
            ${bookOptions}
          </select>
        </div>
        <div class="mb-3">
          <label for="borrowDate" class="form-label">Date d'emprunt</label>
          <input type="date" class="form-control" id="borrowDate" required>
        </div>
        <button type="submit" class="btn btn-primary">Enregistrer l'Emprunt</button>
      </form>
      <div id="error-message" class="mt-3" style="display: none;">
        <p class="alert alert-danger">Ce membre a déjà emprunté ce livre ou il n'y a plus de stock disponible.</p>
      </div>
      <div id="confirmation-message" class="mt-3" style="display: none;">
        <p class="alert alert-success">L'emprunt a été enregistré avec succès !</p>
      </div>
    </div>
  `;

  element.querySelector('#borrow-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const memberIndex = document.getElementById('member').value;
    const bookIndex = document.getElementById('book').value;
    const borrowDate = document.getElementById('borrowDate').value;

    // Vérifier si ce membre a déjà emprunté ce livre
    const existingBorrow = borrows.find(borrow => borrow.memberIndex == memberIndex && borrow.bookIndex == bookIndex && !borrow.actualReturnDate);

    if (existingBorrow || books[bookIndex].quantity <= 0) {
      // Afficher un message d'erreur si le même membre a déjà emprunté le même livre ou si le stock est épuisé
      document.getElementById('error-message').style.display = 'block';
      return;
    }

    // Calculer la date de retour prévue (2 semaines après la date d'emprunt)
    const returnDate = new Date(borrowDate);
    returnDate.setDate(returnDate.getDate() + 14);
    const returnDateString = returnDate.toISOString().split('T')[0];

    const newBorrow = {
      memberIndex: memberIndex,
      bookIndex: bookIndex,
      borrowDate: borrowDate,
      returnDate: returnDateString,
      actualReturnDate: null // Pas encore retourné
    };

    // Ajouter l'emprunt au LocalStorage
    borrows.push(newBorrow);
    localStorage.setItem('borrows', JSON.stringify(borrows));

    // Décrémenter la quantité du livre
    books[bookIndex].quantity -= 1;
    localStorage.setItem('books', JSON.stringify(books));

    // Masquer le message d'erreur et afficher le message de confirmation
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('confirmation-message').style.display = 'block';

    // Réinitialiser le formulaire
    e.target.reset();
  });

  return element;
}
