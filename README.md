# Simple MEN Stack

Modified 2021-03

Following tutorial: https://closebrace.com/tutorials/2017-03-02/the-dead-simple-step-by-step-guide-for-front-end-developers-to-getting-up-and-running-with-nodejs-express-and-mongodb

## MongoDB Setup MacOSX (arm64)
Get and install mongodb via `brew`
```bash
brew tap mongodb/brew
...
brew install mongodb-community@4.4
```

Start mongodb service:
```bash
brew services start mongodb-community@4.4
```

Initialize database and collection
```
> use nodetest1
> db.usercollection.insert({"username" : "testuser1", "email" : "testuser1@testdomain.com" });
```