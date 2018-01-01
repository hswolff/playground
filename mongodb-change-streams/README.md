# mongodb-change-streams

demo and testing it out

## Set up instructions

### From this directory

```
mkdir db
mongod --port 27017 --dbpath $(pwd)/db --replSet rs0
# instantiate the replica set
mongo --eval "rs.initiate()"
```

### Install deps

```
yarn
```

### Start app

```
node index.js
```
