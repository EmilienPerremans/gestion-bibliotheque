export default function HomePage() {
  const element = document.createElement('div');

  element.innerHTML = `
    <div class="container mt-5">
      <h1>Bienvenue sur la Bibliothèque</h1>
      <p>Utilisez les boutons ci-dessous pour naviguer sur le site :</p>
      <div class="row">
        <div class="col-md-4 mb-3">
          <a href="/books" class="btn btn-primary w-100" data-link>Voir la liste des livres</a>
        </div>
        <div class="col-md-4 mb-3">
          <a href="/members" class="btn btn-primary w-100" data-link>Gérer les membres</a>
        </div>
        <div class="col-md-4 mb-3">
          <a href="/add-book" class="btn btn-success w-100" data-link>Ajouter un livre</a>
        </div>
        <div class="col-md-4 mb-3">
          <a href="/add-borrow" class="btn btn-success w-100" data-link>Ajouter un emprunt</a>
        </div>
        <div class="col-md-4 mb-3">
          <a href="/borrow-list" class="btn btn-info w-100" data-link>Voir la liste des emprunts</a>
        </div>
        <div class="col-md-4 mb-3">
          <a href="/become-member" class="btn btn-secondary w-100" data-link>Devenir membre</a>
        </div>
      </div>
    </div>
  `;

  return element;
}
