/*GitHub  Repo Gallery Project

//Big Picture Steps
//1.  Create and name global variables (select elements) (1)
//2.  Fetch User Data (2-4)
//3.  Fetch Repo Data (5-)
//4.  Fetch words and remaining guesses (11-13)
//5.  Play again (clear and reset) (14-15)

//Steps:
//1.  Create global variables
//2.  Fetch API JSON Data
//3.  Fetch & Display User Infomration
//4.  Call the display function and view your project
//5.  Select the Repos List
//6.  Fetch your repos
//7.  Display info about your repos

*/



//1. CREATE and NAME GLOBAL VARIABLES
//5. Select the repos list by creating a global variable to select the unordered list

//div with class of "overview" - where profile information will appear
const repoList = document.querySelector(".repo-list");
const overview = document.querySelector(".overview");
//GitHub username
let username = "KarenHsky";


//2.  FETCH API JSON DATA:  Create async function, and target the users endpoint.  Call function to see results in console.
//4. CALL THE DISPLAY FUNCTION & VIEW YOUR PROJECT: userInfo(user)
const getUserData = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const user = await res.json();
    //console.log(user);
    displayUserInfo(user);
}

getUserData();


//3.  FETCH AND DISPLAY USER INFORMATION
const displayUserInfo = function (user) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${user.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Bio:</strong> ${user.bio}</p>
      <p><strong>Location:</strong> ${user.location}</p>
      <p><strong>Number of public repos:</strong> ${user.public_repos}</p>
    </div> 
    `;
overview.append(div);

};

//6.  FETCH YOUR REPOS
const getRepoData = async function() {
    const res = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await res.json();
    console.log(repoData);
    displayRepos(repoData);
  };
  
getRepoData();

//7.  DISPLAY INFO ABOUT YOUR REPOS (use a for...of loop to iterate through the block of code) QUESTUIB:  why use "repos" when never defined?
const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(repoItem);
  }
};

