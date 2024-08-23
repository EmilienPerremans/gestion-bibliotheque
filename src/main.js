import HomePage from './pages/HomePage.js';
import BooksPage from './pages/BooksPage.js';
import MembersPage from './pages/MembersPage.js';
import BecomeMemberPage from './pages/BecomeMemberPage.js';
import AddBookPage from './pages/AddBookPage.js';
import AddBorrowPage from './pages/AddBorrowPage.js';
import BorrowListPage from './pages/BorrowListPage.js';
import EditMemberPage from './pages/EditMemberPage.js';
import EditBookPage from './pages/EditBookPage.js';

function router() {
  const routes = {
    '/': HomePage,
    '/books': BooksPage,
    '/members': MembersPage,
    '/become-member': BecomeMemberPage,
    '/add-book': AddBookPage,
    '/add-borrow': AddBorrowPage,
    '/borrow-list': BorrowListPage,
    '/edit-member': EditMemberPage,
    '/edit-book': EditBookPage,
  };

  const path = window.location.pathname;
  const app = document.getElementById('app');
  app.innerHTML = '';

  const PageComponent = routes[path] || HomePage;
  app.appendChild(PageComponent());
}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  router();

  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      window.history.pushState(null, '', e.target.href);
      router();
    }
  });
});
