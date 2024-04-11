function FetchCurrentID() {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const pathSegments = url.pathname.split('/');
    const projectId = pathSegments[pathSegments.length - 1];
    return projectId;
}
async function FetchInfo(Id) {
    let FetchValue = fetch('/dashboard/data')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data[Id-1];
    });

return FetchValue;
};

var PanelDiv = `
<form class="Create" onsubmit="CreateSource()">
        
    <p class="CreateTitle">Create Source<p>

    <span class="Type" style="top:17%;">Title</span>
    <input id="TitleInput" class="CreateInput" style="top: 22%;"></input>

    <span class="Type" style="top:29%;">Description</span>
    <textarea id="Description" class="CreateInput" style="top: 34%; height: 4vh;"></textarea>

    <span class="Type" style="top:41%;">Link</span>            
    <textarea id="Link" class="CreateInput" style="top: 46%; height: 4vh;"></textarea>

    <span class="Type" style="top:53%;">Tid</span>
    <input id="Time" type="date" class="CreateInput" style="top: 58%; height: 4vh;"></input>

    <span class="Type" style="top:66%;">Authors (Seperate by ,)</span>
    <input id="Author"  class="CreateInput" style="top: 72%; height: 4vh;"></input>

    <button  class="CreateButton">Create Project</button>
    <button type="button" class="X" onClick="location.reload(); "></button>

</form>
`;

function CreateColumn(Title, Desc, Link, Time, Author) {

    let Info = [Title, Desc, Link, Time, Author];

    for (let i = 0; i < Info.length; i++) {
        let Column = document.createElement("Div");
        let Box = document.getElementById("Box");
        Column.innerHTML = Info[i];
        Column.className = "Source";
        Box.append(Column);
    }
}


function ShowSources(ID) {
    let FetchValue = fetch('/dashboard/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(
        {
            "ID" : ID
        }),
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
        return data;
    },
    
)
return FetchValue;
};

window.addEventListener('load', async function () {

    let CurrentID = FetchCurrentID();
    console.log(CurrentID)
    
    let Info = await fetch('/dashboard/data')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let filteredData = data.filter(sublist => sublist[0] == CurrentID);
        console.log(filteredData);

        let Title = this.document.getElementById("Title");
        Title.innerHTML = filteredData[0][1]
        let Desc = this.document.getElementById("Desc");
        Desc.innerHTML = filteredData[0][2]
    });
    

    

    

    let Sources = await ShowSources(CurrentID);
    console.log(Sources.length);
    for (let i = 0; i < Sources.length; i++) {
        let SourceINFO = Sources[i];

        CreateColumn(SourceINFO[1], SourceINFO[2], SourceINFO[6], SourceINFO[5], SourceINFO[3], SourceINFO[3]); // Each 
    }
    
})

function CreateSource()
{
    let Title = document.getElementById("TitleInput");
    let Description = document.getElementById("Description");
    let Link = document.getElementById("Link");
    let Time = document.getElementById("Time");
    let Author = document.getElementById("Author");
    
    let ID = FetchCurrentID();

    event.preventDefault();
    let FetchPromise = fetch('/dashboard/createSource', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(
        {
            "Title" : Title.value,
            "Description" : Description.value,
            "Link": Link.value,
            "Time": Time.value,
            "Author": Author.value,
            "ownerID": ID
        
        }),
        mode: 'cors'
    });
    var UserStatus = FetchPromise.then((response) => {
        if (response.status == 200) {
            location.reload();
        }
    });
      

}

function ShowPanel() {
    var div = document.createElement("div");
    div.innerHTML = PanelDiv;
    document.body.appendChild(div);
}
