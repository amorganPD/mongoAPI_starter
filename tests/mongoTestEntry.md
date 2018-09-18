## Example to test app.js

```sh
bash run.sh
cd node
node app.js
```

Use a tool like Fiddler or Postman to create a POST request to create a user at:

### Example Request
POST `localhost:3000/user`
### Request Body
```json
{
	"username": "testuser",
	"displayName": "friendly name"
}
```