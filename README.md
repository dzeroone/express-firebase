# Express-Firebase CRUD sample
I am using firestore database for this project

## Setup
### Add serviceAccountKey.json
Grab this _serviceAccountKey.json_ informations from firebase console and add it to the root directory of your project.

### Prepare .env file
Add necessary environment variable information in _.env_ file

```
JWT_SECRET=add_your_jwt_secret_here_to_encrypt_jwt_token
FIREBASE_DB_URL=database_url_from_firebase
```

### Setup nodejs dependencies
Run `npm install` to install nodejs dependencies

Run `npm serve` to start server in production mode