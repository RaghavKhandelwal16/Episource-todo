const inputBox=document.getElementById("input-box");
const listContainer=document.getElementById("list-container");


function searchTasks() {
  const searchBox = document.getElementById('search-box');
  const searchInput = searchBox.value.trim().toUpperCase();
  const listContainer = document.getElementById('list-container');
  const tasks = listContainer.getElementsByTagName('li');
  let resultsFound = false; 

  for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const taskText = task.textContent || task.innerText;
      if (taskText.toUpperCase().indexOf(searchInput) > -1) {
          task.style.display = '';
          resultsFound = true; 
      } else {
          task.style.display = 'none';
      }
  }

  if (!resultsFound) {
      alert('Results not matched.');
  }
}


const searchButton = document.querySelector('.btn-outline-success');
searchButton.addEventListener('click', function (e) {
  e.preventDefault(); 
  searchTasks();
});


function addTask(){
  if(inputBox.value===''){
    alert("Task List cannot be empty!!");
  }
  else{
    let li=document.createElement("li");
    li.innerHTML=inputBox.value;
    listContainer.appendChild(li);
    let span=document.createElement("span");
    span.innerHTML="\u00d7";
    li.appendChild(span);
    saveData();
  }
  inputBox.value="";
  saveData();
}

listContainer.addEventListener("click",function(e){
  if(e.target.tagName==="LI"){
    e.target.classList.toggle("checked");
    saveData();
  }
  else if(e.target.tagName==="SPAN"){
    e.target.parentElement.remove();
    saveData();
  }
},false);

function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
  listContainer.innerHTML=localStorage.getItem("data");
}
showTask();