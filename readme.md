# Mongoose (MongoDB) API Starter Example
Node.js, mongoose (MongoDB), and Docker starter example

## Overview
This is a starter project for a simple REST API using node.js for the server side code and mongodb for the data store. Docker is used to containerize and remove the dependency of installation on the host machine. Docker is not required, but a great way to test the application.

## What is the sample API
Well most common samples are todo list or notes, but since I like to make games, this will be an API that enables game information to be shared across clients, such as, game instance id, users, real time game object, and persistent game object.

## Getting Started
```
./build.sh
docker-compose up -d
```
That will build a local docker image and then setup the docker container and run node and mongodb services

To test the API, either use the Postman collection or cURL:
```bash
curl http://localhost:3000/api/user -H "Content-Type: application/json" -X POST -d '{"username":"testuser","displayName":"friendly name"}'
```
```bash
curl http://localhost:3000/api/user/testuser
```
___
## API Definition
### Player
- `/api/user/`: POST (create)
- `/api/user/`: DELETE
- `/api/user/`: PUT (update)
- `/api/user/{ username }`: GET

### Game Instance
- `/api/gameInstance/`: POST (create)
- `/api/gameInstance`: DELETE
- `/api/gameInstance`: PUT (update)
- `/api/gameInstance/{ guid }`: GET

- `/api/gameInstance/activeUser/{ guid }/{ username }`: PUT
- `/api/gameInstance/activeUser/{ guid }/{ username }`: DELETE

### Game State
- `/api/gameInstance/{ guid }/gameState`: PUT


## Data objects
```json
user: {
  "username": string,
  "displayName": string,
  "gameInstances": [ 'gameInstance.guid' ],
  // "isPublic": boolean,
  // "friendsList": [ 'user.id' ]
}
gameInstance: {
  "guid": string,
  "name": string,
  "creator": 'user { Object }',
  "dateCreated": DateTime,
  // "permissions": {
  //   "isPublic": boolean,
  //   "userGUIDList": [ 'user.guid' ]
  // },
  "usersJoined": [ 'user { Object }' ],
  "usersActive": [ 'user { Object }' ],
  "stateData": 'gameState { Object }'
}

// For WebSocket transfer, but used in gameIntance data as a "save"
gameStateData: {
  "instanceId": 'gameInstance.guid',
  "data": {}
}

// userFriend: [
//   {
//     "idRequested": 'user.id',
//     "idRequestee": 'palyer.id',
//     "status": enum 'Accepted, Denied, Blocked'
//   }
// ]
```