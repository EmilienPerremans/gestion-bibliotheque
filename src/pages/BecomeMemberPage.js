export default function BecomeMemberPage() {
    const element = document.createElement('div');
    element.innerHTML = `
      <div class="container mt-5">
        <h1>Devenir Membre</h1>
        <form id="member-form">
          <div class="mb-3">
            <label for="firstName" class="form-label">Prénom</label>
            <input type="text" class="form-control" id="firstName" required>
          </div>
          <div class="mb-3">
            <label for="lastName" class="form-label">Nom</label>
            <input type="text" class="form-control" id="lastName" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" required>
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Numéro de téléphone</label>
            <input type="tel" class="form-control" id="phone" required>
          </div>
          <button type="submit" class="btn btn-primary">Devenir Membre</button>
        </form>
        <div id="confirmation-message" class="mt-3" style="display: none;">
          <p class="alert alert-success">Merci de vous être inscrit comme membre !</p>
        </div>
      </div>
    `;
  
    // Gestion du formulaire
    element.querySelector('#member-form').addEventListener('submit', (e) => {
      e.preventDefault();
  
      const newMember = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
      };
  
      // Stocker les données dans LocalStorage
      let members = JSON.parse(localStorage.getItem('members')) || [];
      members.push(newMember);
      localStorage.setItem('members', JSON.stringify(members));
  
      // Afficher un message de confirmation
      document.getElementById('confirmation-message').style.display = 'block';
  
      // Réinitialiser le formulaire
      e.target.reset();
    });
  
    return element;
  }
  