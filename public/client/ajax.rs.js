var submitForm = document.getElementById('submit');

const alert = document.getElementById('alert');
const alertMessage = document.getElementById('message');

submitForm.addEventListener('click', (e) => {
    e.preventDefault();

    var user = document.getElementById("user").value;
    var mail = document.getElementById("mail").value;
    var password = document.getElementById("password").value;
    var rpassword = document.getElementById("rpassword").value;

    const xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            if(this.responseText == 'PANF') {
                alert.classList.add('d-block');
                alert.classList.remove('d-none');

                alert.classList.add('alert-danger');
                alert.classList.remove('alert-success');

                alertMessage.innerHTML = 'Password should be filled!';
            } else if(this.responseText == 'PANS') {
                alert.classList.add('d-block');
                alert.classList.remove('d-none');

                alert.classList.add('alert-danger');
                alert.classList.remove('alert-success');

                alertMessage.innerHTML = 'Password should be same!';
            } else if(this.responseText == 'MOUANF') {
                alert.classList.add('d-block');
                alert.classList.remove('d-none');

                alert.classList.add('alert-danger');
                alert.classList.remove('alert-success');

                alertMessage.innerHTML = 'Mail or user aren\'t filled!';
            } else if(this.responseText == 'UAR') {
                alert.classList.add('d-block');
                alert.classList.remove('d-none');

                alert.classList.add('alert-danger');
                alert.classList.remove('alert-success');

                alertMessage.innerHTML = 'User already registered!';
            } else {
                alert.classList.add('d-block');
                alert.classList.remove('d-none');

                alert.classList.add('alert-success');
                alert.classList.remove('alert-danger');

                alertMessage.innerHTML = 'User registered! <a href="/">Click here</a>';
            }

        }
    }

    xhttp.open('POST', '/register/done?username=' + user + '&mail=' + mail + '&password=' + password + '&rpassword=' + rpassword);
    xhttp.overrideMimeType("text/html");
    xhttp.send();
});
