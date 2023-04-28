const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const router = express.Router();

const server = require('../server/db.config.js');

router.get('/', (request, respond) => {
    respond.sendFile(path.join(__dirname, '../public/index.html'));
});

router.post('/login', (request, respond) => {
    usernameTaken = request.query.username;
    mailTaken = request.query.mail;
    passwordTaken = request.query.password;
    
    if(!mailTaken == "" || !usernameTaken || !passwordTaken == "") {
        sql = 'SELECT mail, password FROM users WHERE mail = ?';

        server.query(sql, [mailTaken], (err, res, field) => {
            if(res) {
                try {
                    if(mailTaken == res[0].mail) {
                        bcrypt.compare(passwordTaken, res[0].password, (err, result) => {
                            if(result) {
                                console.log('Logged');
                                respond.write('LOG');
                                respond.end();
                            } else {
                                respond.write('NOLOG'); // If wrong password
                                respond.end();
                            }
                        })
                    } else {
                        respond.write('NOLOG'); // If wrong password
                        respond.end();
                    }
                } catch(error) {
                    respond.write('NOLOG'); // If wrong password
                    respond.end();
                }
            } else {
                respond.write('UDE');
                respond.end();
            }
        });
    } else {
        respond.write('MUPN') // Mail, username or password aren't filled
        respond.end();
    }
});

module.exports = router;