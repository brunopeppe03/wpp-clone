const firebase = require('firebase');
require('firebase/firestore');


export class Firebase {

    constructor(){

        this._config = {

        apiKey: "AIzaSyAX4roPYEdbYguHCSzzW-9cGhscsz7xZvc",
          
        authDomain: "whatsapp-clone-20d84.firebaseapp.com",
      
        projectId: "whatsapp-clone-20d84",
      
        storageBucket: "whatsapp-clone-20d84.appspot.com",
      
        messagingSenderId: "46830175339"

        };

        this.init();

    }

    init(){

        if(!window._initializedFirebase) {
          
          firebase.initializeApp( this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true

            });

            window._initializedFirebase = true;

        }

    }

    static db(){

        return firebase.firestore();


    }

    static hd(){

        return firebase.storage();

    }

    initAuth(){

        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result => {
                console.log(result)

                let token = result.credential.idToken;
                let user = result.user;

               s({
                user,
                token
               });
               
            })
            .catch(err=>{
                f(err);


            });

        });

    }

}