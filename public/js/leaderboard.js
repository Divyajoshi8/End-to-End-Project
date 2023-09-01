const categoryItems = document.querySelectorAll(".dropdown-item");
const categoryInput = document.querySelector("#categoryInput");
const categoryBtn = document.querySelector("#categoryBtn");
const tbody = document.getElementById("tbodyId");

categoryItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    const selectedCategory = e.target.getAttribute("data-value");
    categoryBtn.textContent = e.target.textContent;
    categoryInput.value = selectedCategory;
  });
});



// async function getLeaderboard() {
//     clearLeaderboard();
//     const res = await axios.get("http://localhost:3000/user/getAllUsers");
//   let position = 1;
//   console.log(res.data);
//   res.data.forEach((user) => {
//     let name = user.name;
//     let amount = user.totalExpenses;

//     //console.log(name, amount);
//     let tr = document.createElement("tr");
//     tr.setAttribute("class", "trStyle");

//     tbody.appendChild(tr);

//     let th = document.createElement("th");
//     th.setAttribute("scope", "row");
//     th.appendChild(document.createTextNode(position++));

//     let td1 = document.createElement("td");
//     td1.appendChild(document.createTextNode(name));

//     let td2 = document.createElement("td");
//     td2.appendChild(document.createTextNode(amount));

//     tr.appendChild(th);
//     tr.appendChild(td1);
//     tr.appendChild(td2);
//   });
// }
async function getLeaderboard() {
    try {
      
  
      const res = await axios.get("http://localhost:3000/user/getAllUsers");

      // Clear existing leaderboard data
      clearLeaderboard();
      let position = 1;
      console.log(res.data);
      res.data.forEach((user) => {
        let name = user.name;
        let amount = user.totalExpenses;
  
        //console.log(name, amount);
        let tr = document.createElement("tr");
        tr.setAttribute("class", "trStyle");
  
        tbody.appendChild(tr);
  
        let th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.appendChild(document.createTextNode(position++));
  
        let td1 = document.createElement("td");
        td1.appendChild(document.createTextNode(name));
  
        let td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(amount));
  
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
      });
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  }
  

document.addEventListener("DOMContentLoaded", getLeaderboard);

function clearLeaderboard() {
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }
  