document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchQuery = searchInput.value;
      getUserData(searchQuery);
    });
  
    function getUserData(username) {
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(response => response.json())
        .then(user => {
          const userCard = `
            <li>
              <img src="${user.avatar_url}" alt="User Avatar"/>
              <h3>${user.login}</h3>
              <p><a href="${user.html_url}" target="_blank">View Profile</a></p>
            </li>
          `;
          userList.innerHTML = userCard;
          return fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
              'Accept': 'application/vnd.github.v3+json'
            }
          });
        })
        .then(response => response.json())
        .then(repos => {
          const reposListItems = repos.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join('');
          reposList.innerHTML = `<h3>Repositories</h3><ul>${reposListItems}</ul>`;
        })
        .catch(error => {
          userList.innerHTML = `<li>${error.message}</li>`;
        });
    }
  });