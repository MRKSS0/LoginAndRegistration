const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');

const server = require('../server/db.config');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: false}));

router.get('/', (request, respond) => {
    respond.sendFile(path.join(__dirname, '../public/pages/register.html'));
});

/**
 * Comments [from 58 line]
 * in the code are created to verify 
 * the message through ajax
 */

router.post('/done', (request, respond) => {
    usernameTaken = request.query.username;
    mailTaken = request.query.mail;
    passwordTaken = request.query.password;
    repeatPasswordTaken = request.query.rpassword;

    if(!mailTaken == "" && !usernameTaken == "" ) {
        if(!passwordTaken == "" && !repeatPasswordTaken == "") {
            if(passwordTaken == repeatPasswordTaken) {
                sqlCheck = 'SELECT mail FROM users WHERE mail = ?';
              
                server.query(sqlCheck, [mailTaken], (err, res, field) => {
                    if(res.length > 0 || !err) {
                        respond.end();
                        bcrypt.hash(repeatPasswordTaken, 10, (err, hash) => {
                            if(!err) {
                                sql = 'INSERT INTO users(ID, user, mail, password) VALUES(NULL, ?, ?, ?)';
            
                                server.query(sql, [usernameTaken, mailTaken, hash], (err, res, fields) => {
                                    if(!err) {
                                        try{
                                            console.log('User added!');  
                                        } catch(err) {
                                            console.log('Something gone wrong ' + err);
                                        }
                                    }
                                });
                            }
                        }); 
                    } else {
                        console.log('User already registered');
                        respond.write('UAR') // User already registered
                    }
                });
            }else {
                respond.write('PANS') // Password aren't same
                respond.end();
            }   
        } else {
            respond.write('PANF'); // Password aren't filled
            respond.end();
        }
    } else {
        respond.write('MOUANF'); // Mail or user aren't filled
        respond.end();
    }
});

module.exports = router;