// For some reason, Javascript cannot handle modules refrenced by the .EJS file? 
// ERROR: export declarations may only appear at top level of a module
// When the imports are obviously at the top? Validation functions will have to be in here. 
function Move(Location)
{
    location.href = Location
}

// Create Error messages
function CreateError(Inner, Class)
{
    document.querySelectorAll(Class).forEach(e => e.remove());
    let Error = document.createElement("p");
    let form = document.getElementById("Form");
    Error.innerHTML = Inner;
    Error.className = Class;
    form.append(Error);
}


// Validation functions! 
function ValMail(Input)
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Input)) { /* Check if Email is valid */
        return true;
    }
    else { /* Display error message and return false if mail is incorrect */
        CreateError("Please check your email and try again!", "failMail");
        return false;
    }
}

function ValPass(Pswrd)
{
    if(Pswrd.length > 12) {
        return true;
    } else { CreateError("Password requires atleast 12 characters", "failPass"); return false;}
} 

function ValidateForm() {
    
    let MailValue = document.getElementById("Email");
    
    let PassValue = document.getElementById("Pswrd")

    let ValidPass = ValPass(PassValue.value);
    let ValidMail = ValMail(MailValue.value);
    
    if(ValidPass == false ||  ValidMail == false)
    {
        console.log("Form fail")
        return false
    }
    
    // Send fetch request 
    let FetchPromise = fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(
        {
            "Email" : MailValue.value,
            "Pass" : PassValue.value
        
        }),
        mode: 'cors'
    });
    console.log(FetchPromise);
    // Await finished status
    var MailStatus = FetchPromise.then((response) => {
        console.log(`Received response: ${response.json}`);

        if (response.status == 409) {
            console.log(response);
            console.log("ERROR");
            CreateError("Email already in use!", "failMail");

        }
    });
}
