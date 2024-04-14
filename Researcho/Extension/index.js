function Create()
{
    
}

window.addEventListener('load', function () {
    fetch('http://127.0.0.1:3000/dashboard/data')
    .then(response => response.json())
    .then(data => {
        
        for (let i = 0; i < data.length; i++) {
            let Info = data[i];

            console.log(Info[1]);
            Create()

        }

    })
});