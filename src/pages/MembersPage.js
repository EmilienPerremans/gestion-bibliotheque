export default function MembersPage() {
    const element = document.createElement('div');
  
    // Récupérer les membres depuis LocalStorage
    const members = JSON.parse(localStorage.getItem('members')) || [];
  
    // Construire le tableau HTML pour afficher les membres
    let membersTable = `
      <div class="container mt-5">
        <h1>Liste des Membres</h1>
        <table class="table table-striped mt-3">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Numéro de téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
    `;
  
    // Ajouter une ligne pour chaque membre avec les boutons Modifier et Supprimer
    members.forEach((member, index) => {
      membersTable += `
        <tr>
          <td>${member.lastName}</td>
          <td>${member.firstName}</td>
          <td>${member.email}</td>
          <td>${member.phone}</td>
          <td>
            <button class="btn btn-sm btn-primary edit-btn" data-index="${index}">Modifier</button>
            <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Supprimer</button>
          </td>
        </tr>
      `;
    });
  
    // Fermer la table
    membersTable += `
          </tbody>
        </table>
      </div>
    `;
  
    // Si aucun membre n'est trouvé, afficher un message alternatif
    if (members.length === 0) {
      membersTable = `
        <div class="container mt-5">
          <h1>Liste des Membres</h1>
          <p>Aucun membre trouvé.</p>
        </div>
      `;
    }
  
    element.innerHTML = membersTable;
  
    // Gérer la suppression d'un membre
    element.querySelectorAll('.delete-btn').forEach((button) => {
      button.addEventListener('click', (e) => {
        const memberIndex = e.target.getAttribute('data-index');
        members.splice(memberIndex, 1); // Supprimer le membre de la liste
        localStorage.setItem('members', JSON.stringify(members)); // Mettre à jour le LocalStorage
        window.location.reload(); // Recharger la page pour mettre à jour l'affichage
      });
    });
  
    // Gérer la modification d'un membre
    element.querySelectorAll('.edit-btn').forEach((button) => {
      button.addEventListener('click', (e) => {
        const memberIndex = e.target.getAttribute('data-index');
        window.history.pushState(null, '', `/edit-member?index=${memberIndex}`);
        window.dispatchEvent(new Event('popstate')); // Charger la page de modification
      });
    });
  
    return element;
  }
  