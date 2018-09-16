# Mongoose (MongoDB) API Starter Example
Node.js, mongoose (MongoDB), and Docker starter example

## Overview
This is a starter project for a simple REST API using node.js for the server side code and mongodb for the data store. Docker is used to containerize and remove the dependency of installation on the host machine. Docker is not required, but a great way to test the application.

## What is the sample API
Well most common samples are todo list or notes, but since I like to make games, this will be an API that enables game information to be shared across clients, such as, game instance id, players, real time game object, and persistent game object.

## API Definition
### Player
- `/player/`: POST (create)
- `/player/`: DELETE
- `/player/`: PUT (update)
- `/player/{ username }`: GET

### Game Instance
- `/gameInstance/`: POST (create)
- `/gameInstance`: DELETE
- `/gameInstance`: POST (update)
- `/gameInstance/{ guid }`: GET

- `/gameInstancePlayerJoined/{ guid }`: POST
- `/gameInstancePlayerActive/{ guid }`: POST
- `/gameInstancePlayerActive/{ guid }`: DELETE

### Game State
- `/saveGameState/{ guid }`: POST


## Data objects
```json
player: {
  "username": string,
  "displayName": string,
  "gameInstances": [ 'gameInstance.guid' ],
  // "isPublic": boolean,
  // "friendsList": [ 'player.id' ]
}
gameInstance: {
  "guid": string,
  "name": string,
  "creator": 'player { Object }',
  "dateCreated": DateTime,
  "permissions": {
    "isPublic": boolean,
    "playerGUIDList": [ 'player.guid' ]
  },
  "playersJoined": [ 'player { Object }' ],
  "playersActive": [ 'player { Object }' ],
  "stateData": 'gameState { Object }'
}

// For WebSocket transfer, but used in gameIntance data as a "save"
gameStateData: {
  "instanceId": 'gameInstance.guid',
  "data": {}
}

// playerFriend: [
//   {
//     "idRequested": 'player.id',
//     "idRequestee": 'palyer.id',
//     "status": enum 'Accepted, Denied, Blocked'
//   }
// ]
```