window.addEventListener('DOMContentLoaded', () => {
    let Button = document.getElementById("ButtonTest")

    

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
            chrome.cookies.set({
                url:  "http://127.0.0.1:3000",
                name: "connect",
                value: serializedData
            });
            
            document.location.href = "index.html"


        })

        
        
    }
    
    
    Button.addEventListener("click", test);
    
    




});



