export default function MembersPage() {
  const element = document.createElement('div');

  // Fonction pour charger les membres depuis LocalStorage
  const loadMembers = () => {
    const members = JSON.parse(localStorage.getItem('members')) || [];
    displayMembers(members);
  };

  // Fonction pour afficher les membres
  const displayMembers = (members) => {
    let membersList = `
      <div class="container mt-5">
        <h1>Liste des Membres</h1>
        <div class="row">
    `;

    members.forEach((member, index) => {
      membersList += `
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">${member.firstName} ${member.lastName}</h5>
              <p class="card-text"><strong>Email :</strong> ${member.email}</p>
              <p class="card-text"><strong>Téléphone :</strong> ${member.phone}</p>
              <button class="btn btn-primary edit-member-btn" data-index="${index}">Modifier</button>
              <button class="btn btn-danger delete-member-btn" data-index="${index}">Supprimer</button>
            </div>
          </div>
        </div>
      `;
    });

    membersList += `
        </div>
      </div>
    `;

    element.innerHTML = membersList;

    // Ajouter les événements de clic pour les boutons Modifier et Supprimer
    element.querySelectorAll('.edit-member-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const memberIndex = parseInt(e.target.getAttribute('data-index'), 10);
        editMember(memberIndex, members);
      });
    });

    element.querySelectorAll('.delete-member-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const memberIndex = parseInt(e.target.getAttribute('data-index'), 10);
        deleteMember(memberIndex, members);
      });
    });
  };

  // Fonction pour éditer un membre
  const editMember = (memberIndex, members) => {
    const member = members[memberIndex];

    // Afficher un formulaire pré-rempli pour modifier les informations du membre
    const editForm = `
      <div class="container mt-5">
        <h1>Modifier le Membre</h1>
        <form id="edit-member-form">
          <div class="mb-3">
            <label for="firstName" class="form-label">Prénom</label>
            <input type="text" class="form-control" id="firstName" value="${member.firstName}" required>
          </div>
          <div class="mb-3">
            <label for="lastName" class="form-label">Nom</label>
            <input type="text" class="form-control" id="lastName" value="${member.lastName}" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" value="${member.email}" required>
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Téléphone</label>
            <input type="text" class="form-control" id="phone" value="${member.phone}" required>
          </div>
          <button type="submit" class="btn btn-primary">Enregistrer les modifications</button>
          <button type="button" class="btn btn-secondary" id="cancel-edit-btn">Annuler</button>
        </form>
      </div>
    `;

    element.innerHTML = editForm;

    // Gérer la soumission du formulaire de modification
    element.querySelector('#edit-member-form').addEventListener('submit', (e) => {
      e.preventDefault();

      // Mettre à jour les informations du membre
      members[memberIndex].firstName = document.getElementById('firstName').value;
      members[memberIndex].lastName = document.getElementById('lastName').value;
      members[memberIndex].email = document.getElementById('email').value;
      members[memberIndex].phone = document.getElementById('phone').value;

      // Mettre à jour le LocalStorage
      localStorage.setItem('members', JSON.stringify(members));

      // Recharger la liste des membres après la modification
      loadMembers();
    });

    // Gérer l'annulation de la modification
    document.getElementById('cancel-edit-btn').addEventListener('click', () => {
      loadMembers(); // Recharger la liste des membres sans modification
    });
  };

  // Fonction pour supprimer un membre
  const deleteMember = (memberIndex, members) => {
    // Supprimer le membre de la liste
    members.splice(memberIndex, 1);

    // Mettre à jour le LocalStorage
    localStorage.setItem('members', JSON.stringify(members));

    // Recharger la liste des membres après la suppression
    loadMembers();
  };

  // Charger les membres lorsque la page est affichée
  loadMembers();

  return element;
}
