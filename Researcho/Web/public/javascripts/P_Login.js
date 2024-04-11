function Move(Location)
{
    location.href = Location
}


function SendForm()
{
    let MailValue = document.getElementById("Email");
    let PassValue = document.getElementById("Pswrd")

    let FetchPromise = fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(
        {
            "Email" : MailValue.value,
            "Pass" : PassValue.value
        }),
        mode: 'cors'
    });

        var UserStatus = FetchPromise.then((response) => {
            if (response.status == 200) {
                location.reload();
            }
        });



}