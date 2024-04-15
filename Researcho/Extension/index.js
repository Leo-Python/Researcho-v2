function Create(Name, PID)
{
    console.log(Name);
    let Title = document.createElement("p");
    Title.id = PID;
    let Sidebar = document.getElementById("sidebar");
    Title.innerHTML = Name;
    Sidebar.append(Title);

    return Title
}

window.addEventListener('load', function () {

    chrome.storage.sync.get("Name", function(result) {
        const data = result.Name;
        // Now you can use the retrieved data
        console.log(data);
        let Current = document.getElementById("Current");
        Current.innerHTML = data
    });

    fetch('http://127.0.0.1:3000/dashboard/data')
    .then(response => response.json())
    .then(data => {
        
        for (let i = 0; i < data.length; i++) {
            let Info = data[i];

            
            let Project = Create(Info[1], Info[0]);
            console.log(Project)
            Project.onclick = function() {
                
                let Current = document.getElementById("Current");
                Current.innerHTML = Project.innerHTML
                
                chrome.storage.sync.set({ "Selected": Project.id, "Name":Project.innerHTML }, function() {
                    console.log('Data saved successfully');
                });
                
            };

        }

    })
});