# An Online Currency Exchange App

Application has not been completed. There is a lack of key functionality on the server side, i.e. currency transaction. It is only possible to register an account and login.

The website has been deployed at: https://us-central1-online-exchange-app.cloudfunctions.net/api
but unfortunately, doesn't work. Second hosting at: https://brave-varahamihira-b52e00.netlify.com also does't work.
So at the present moment, only the developer version can be started.

To start serve frontend app run `npm start` from `front` directory.  
To start serve localy API run `npm run serve:back` from `functions` directory.

GitHub: https://github.com/jaroslaw-bagnicki/online_currency_exchange_app

Note:  
App based on [**Firebase Authentication SDK**](https://firebase.google.com/docs/auth) on client side and [**Firebase Admin SDK**](https://firebase.google.com/docs/admin/setup) on server side. To run app You need [set up Firebase project](https://firebase.google.com/docs/web/setup) with [enabled email/password sign-in](https://firebase.google.com/docs/auth/web/password-auth). Extra for interact functions with Firebase API locally You need [set up admin credentials](https://firebase.google.com/docs/functions/local-emulator).