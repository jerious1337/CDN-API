# LocalDatabase
### A "Database" made with typescript, used in my main project (Opencord)

## Features:
- Can share images
- Edit queries
- Delete queries
- Add queries

## How it works:
Can search for objects, edit objects, etc (with json objects), using a .json file as a database (all locally)

## Dependencies used:
- fs
- path
- cors
- multer
- dotenv
- crypto
- express

### Getting image<br>
```ts
const image = await fetch('http://<DOMAIN-HOSTED>:<PORT-HOSTED>/attachment/<FILE-NAME>', {
    method: 'GET'
})
```
returns the image file

### Uploading a image to API using axios and FormData
```ts
const form_data = new FormData()
form_data.append('file', fs.createReadStream(file_path), file_name)

if (form_data === undefined || data === undefined) {
    return
}

await axios.post(`http://<DOMAIN-HOSTED>:<PORT-HOSTED>/upload/<API-KEY>`, form_data, {
    headers: {
        ...form_data.getHeaders(),
    }
})

fs.unlinkSync(file_path)
```
uploads the image to the API.

## How to run:<br>
```ts
npx ts-node src/api/main.ts
```

## Attachment logs file example:
![image](https://github.com/user-attachments/assets/ccbaab0e-7771-4d28-85be-e2dae5597493)
