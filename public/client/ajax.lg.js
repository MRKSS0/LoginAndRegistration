var submitForm = document.getElementById('submit');

const alert = document.getElementById('alert');
const alertMessage = document.getElementById('message');

submitForm.addEventListener('click', (e) => {
    e.preventDefault();

    var user = document.getElementById("user").value;
    var mail = document.getElementById("mail").value;
    var password = document.getElementById("password").value;

    const xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            if(this.responseText == 'MUPN') {
                alert.classList.add('d-block');
                alert.classList.remove('d-none');

                alert.classList.add('alert-danger');
                alert.classList.remove('alert-success');

                alertMessage.innerHTML = 'Mail, username or password aren\'t filled!';
            } else if(this.responseText == 'UDE') {
                alert.classList.add('d-block');
                alert.classList.remove('d-none');

                alert.classList.add('alert-danger');
                alert.classList.remove('alert-success');

                alertMessage.innerHTML = 'The user doesn\'t exist';
            } else if(this.responseText == 'NOLOG') {
                alert.classList.add('d-block');
                alert.classList.remove('d-none');

                alert.classList.add('alert-danger');
                alert.classList.remove('alert-success');

                alertMessage.innerHTML = 'Wrong password or mail';
            } else if(this.responseText == 'LOG') {
                alert.classList.add('d-block');
                alert.classList.remove('d-none');

                alert.classList.add('alert-success');
                alert.classList.remove('alert-danger');

                alertMessage.innerHTML = 'Logged!';
            }

        }
    }

    xhttp.open('POST', 'login?username=' + user + '&mail=' + mail + '&password=' + password);
    xhttp.overrideMimeType("text/html");
    xhttp.send();
});
