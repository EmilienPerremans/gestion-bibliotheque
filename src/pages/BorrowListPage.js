export default function BorrowListPage() {
  const element = document.createElement('div');

  // Récupérer les emprunts, membres, et livres depuis LocalStorage
  const borrows = JSON.parse(localStorage.getItem('borrows')) || [];
  const members = JSON.parse(localStorage.getItem('members')) || [];
  const books = JSON.parse(localStorage.getItem('books')) || [];

  // Vérifier si des emprunts existent
  if (borrows.length === 0) {
    element.innerHTML = `
      <div class="container mt-5">
        <h1>Liste des Emprunts</h1>
        <p>Aucun emprunt trouvé.</p>
      </div>
    `;
    return element;
  }

  let borrowsTable = `
    <div class="container mt-5">
      <h1>Liste des Emprunts</h1>
      <table class="table table-striped mt-3">
        <thead>
          <tr>
            <th>Membre</th>
            <th>Livre</th>
            <th>Date d'emprunt</th>
            <th>Date de retour prévu</th>
            <th>Date de retour effectif</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  `;

  borrows.forEach((borrow, index) => {
    const member = members[borrow.memberIndex];
    const book = books[borrow.bookIndex];

    const memberName = member ? `${member.firstName} ${member.lastName}` : 'Membre inconnu';
    const bookTitle = book ? `${book.title} par ${book.author}` : 'Livre inconnu';

    borrowsTable += `
      <tr>
        <td>${memberName}</td>
        <td>${bookTitle}</td>
        <td>${borrow.borrowDate}</td>
        <td>${borrow.returnDate}</td>
        <td>${borrow.actualReturnDate ? borrow.actualReturnDate : 'Pas encore retourné'}</td>
        <td>
          ${!borrow.actualReturnDate ? `
            <button class="btn btn-sm btn-success return-btn" data-index="${index}">Retourner</button>
          ` : `
            <button class="btn btn-sm btn-danger delete-borrow-btn" data-index="${index}">Supprimer</button>
          `}
        </td>
      </tr>
    `;
  });

  borrowsTable += `
        </tbody>
      </table>
    </div>
  `;

  element.innerHTML = borrowsTable;

  // Gérer le retour des livres
  element.querySelectorAll('.return-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      const borrowIndex = e.target.getAttribute('data-index');
      const borrow = borrows[borrowIndex];

      // Marquer le livre comme retourné
      borrow.actualReturnDate = new Date().toISOString().split('T')[0];
      books[borrow.bookIndex].quantity += 1; // Incrémenter la quantité disponible

      // Mettre à jour les données dans LocalStorage
      localStorage.setItem('borrows', JSON.stringify(borrows));
      localStorage.setItem('books', JSON.stringify(books));

      window.location.reload(); // Recharger la page pour mettre à jour l'affichage
    });
  });

  // Gérer la suppression d'un emprunt
  element.querySelectorAll('.delete-borrow-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      const borrowIndex = e.target.getAttribute('data-index');
      borrows.splice(borrowIndex, 1); // Supprimer l'emprunt de la liste
      localStorage.setItem('borrows', JSON.stringify(borrows)); // Mettre à jour le LocalStorage
      window.location.reload(); // Recharger la page pour mettre à jour l'affichage
    });
  });

  return element;
}
