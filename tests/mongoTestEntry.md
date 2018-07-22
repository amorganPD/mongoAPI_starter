## Example to test index.js
```sh
docker exec -it <container-id> bash
mongo
use mydb
db.pokemon.insertOne({"name": "charizard"})
```