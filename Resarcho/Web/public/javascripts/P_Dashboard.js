function CreateProjectView(Name, Desc)
{
    let dashboardList = document.getElementById("dashboard")
    let Project = document.createElement("div");
    Project.setAttribute("id", "ProjectButton")
    Project.className = "project"
    dashboardList.append(Project)

    // Name

    let name = document.createElement("p");
    name.innerHTML = Name
    name.className = "projectTitle"
    Project.append(name);

    // Desc

    let Description = document.createElement("p");
    Description.innerHTML = Desc
    Description.className = "projectDescription"
    Project.append(Description);

    let RemoveButton = document.createElement("button");
    RemoveButton.className = "projectRemove"
    Project.append(RemoveButton);

    let EditButton = document.createElement("button");
    EditButton.className = "projectEdit"
    Project.append(EditButton);
    
    return Project;

}
function CreateProject()
{
    let Name = document.getElementById("Name")
    let Description = document.getElementById("Description")

    event.preventDefault();
    let FetchPromise = fetch('dashboard/createProject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(
        {
            "Name" : Name.value,
            "Description" : Description.value
        
        }),
        mode: 'cors'
    });
    var UserStatus = FetchPromise.then((response) => {
        if (response.status == 200) {
            location.reload();
        }
    });
      

}
function ShowProject(projectId) {
    let FetchPromise = fetch(`/projects/${projectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
        mode: 'cors'
    });
    var UserStatus = FetchPromise.then((response) => {
        if (response.status == 200) {
            location.href = `/dashboard/projects/${projectId}`
        }
    });
}

var PanelDiv = `
<form class="Create" onsubmit="CreateProject()">
        
    <p class="CreateTitle">Create new Project<p>

    <span class="Type" style="top:25%;">Name</span>
    <input id="Name" class="CreateInput" style="top: 35%;"></input>
    <span class="Type" style="top:45%;">Description</span>
    <textarea id="Description" class="CreateInput" style="top: 58%; height: 8vh;"></textarea>

    <button class="CreateButton">Create Project</button>
    <button type="button" class="X" onClick="location.reload(); "></button>

</form>
`;

window.addEventListener('load', function () {
    fetch('dashboard/data')
    .then(response => response.json())
    .then(data => {
        
        for (let i = 0; i < data.length; i++) {
            Info = data[i];

            let Name = Info[1]
            let Description = Info[2]
            Project = CreateProjectView(Name, Description)
            Project.setAttribute("ID", Info[0])
            let ID = Project.id
            Project.onclick = function() {
                ShowProject(ID);
            }

        }

    })
    .catch(error => {
        console.error('Error:', error);
    });

    
    
})


function ShowPanel() {
    var div = document.createElement("div");
    div.innerHTML = PanelDiv;
    document.body.appendChild(div);
}


