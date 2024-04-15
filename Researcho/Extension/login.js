window.addEventListener('DOMContentLoaded', () => {
    let Button = document.getElementById("ButtonTest")

    chrome.storage.sync.get("Data", function(result) {
        let data = result.Data;
        console.log(data);

        if(data) {
            console.log(data)
            document.location.href = "index.html"
        }
        else {
            console.log("no data")
        }
    });

        

    function test() {
        let Email = document.getElementById("mail");
        let Pass = document.getElementById("pass");
       
        let FetchPromise = fetch('http://127.0.0.1:3000/login/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(
            {
                "Email" : Email.value,
                "Pass" : Pass.value
            }),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming the response is JSON
        }).then((data) => {

            const serializedData = JSON.stringify(data);

            console.log(serializedData);
            
            chrome.storage.sync.set({ "Data": serializedData }, function() {
                console.log('Data saved successfully');
            });
            
            document.location.href = "index.html"


        })

        
        
    }
    
    
    Button.addEventListener("click", test);
    
    




});



