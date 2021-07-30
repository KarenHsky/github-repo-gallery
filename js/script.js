/*GitHub  Repo Gallery Project

//Big Picture Steps
//1.  Create and name global variables (select elements) (1)
//2.  Fetch User Data (2-4)
//3.  Fetch Repo Data (5-7)
//4.  Display Repo Info (8-13)
//5.  Create a Dynamic Search (14-)

//Steps:
//1.  Create global variables
//2.  Fetch API JSON Data
//3.  Fetch & Display User Infomration
//4.  Call the display function and view your project
//5.  Select the Repos List
//6.  Fetch your repos
//7.  Display info about your repos
//8.  Declare 2 new global variables
//9.  Add a click event
//10. Create a function to get specific repo info
//11. Create an array of languages
//12. Createa function to display specific repo info
//13. Call your function and view your work
//14. Create global variables to select a button and input
//15. Add a click event to the back button
//16. Display the input element
//17. Add an input event to the search box

*/



//1. CREATE and NAME GLOBAL VARIABLES
//5. Select the repos list by creating a global variable to select the unordered list
//14. Create global variables to select a button and input

//div with class of "overview" - where profile information will appear
const repoList = document.querySelector(".repo-list");
const overview = document.querySelector(".overview");
const allReposContainer = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");
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
  //16. DISPLAY THE INPUT ELEMENT
  filterInput.classList.remove("hide");
};

//9.  ADD CLICK EVENT
repoList.addEventListener("click", function(e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

//10.  CREATE A FUNCTION TO GET SPECIFIC REPO INFO
const getRepoInfo = async function (repoName) {
  const res = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await res.json();
  console.log(repoInfo);
  const fetchLanguages = await fetch (repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
 //console.log(languageData);

const languages = []
  for (const language in languageData) {
    languages.push(language);
  }
displayRepoInfo(repoInfo, languages);

};

 //.  CREATE A FUNCTION TO DISPLAY SPECIFIC REPO INFO
 const displayRepoInfo = function (repoInfo, languages) {
   repoData.innerHTML = "";
   const div = document.createElement("div");
   div.innerHTML = `
   <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_brancj}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
   `;
      repoData.append(div);
      repoData.classList.remove("hide");
      allReposContainer.classList.add("hide");
      viewReposButton.classList.remove("hide");
 };

 //15. ADD CLICK EVENT TO BACK BUTTON
 viewReposButton.addEventListener("click", function() {
   allReposContainer.classList.remove("hide");
   repoData.classList.add("hide");
   viewReposButton.classList.add("hide");
 });


 //ADD AN INPUT EVENT TO THE SEARCH BOX to create a dynamic search
 filterInput.addEventListener("input", function(e) {
  const searchText = e.target.value; 
  const repos = document.querySelectorAll(".repo");
  const searchLowerText = searchText.toLowerCase();

  for (const repo of repos) {
    const repoLowerText = repo.innerText.toLowerCase();
    if (repoLowerText.includes(searchLowerText)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});


