var nithin = {};

document.querySelector('.update').addEventListener("click",()=>{
    var name = $("input").tagsinput('items');
    var email = document.querySelector('.betaEmail').value;
    // var number = document.querySelector('.betaNumber').value.substr(1);

    console.log(name[1]);
    console.log(email);
    // console.log(number);

    document.querySelector('.first').style.display='none';
    document.querySelector('.success').style.display='block';

    nithin["name"]=name[1];
    nithin["email"]=email;
    // nithin["number"]=number

    chrome.storage.sync.set({
        nithin
    }, function() {
        console.log(nithin);
    });

    var data = new FormData();
    data.append("email", email);
    data.append("names", name[1]);
    // data.append("number", number);

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
    }
    });

    xhr.open("POST", "https://nithins.me/nbot/nalert.php");

    xhr.send(data);
})