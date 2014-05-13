FaceCompass-backend
===================

## Innovation in motion, May 13th, 2014, at 6pm

## Endpoints

- **GET /new** returns a new survey JSON array, with 10 question objects:
```json
[{
  "name": "Jackson Gariety",
  "image": "jackson_gariety.jpg",
  "choices": ["Kevin Long", "Jackson Gariety", "Ben Kerney", "Dave Shanely"]
}]
```

- **POST /score/new** accepts a score object and returns either 200 or 400. 200 if formatted as follows: 
```json
{
  "name": "garietyxxx",
  "score": 1000
}
```

- **GET /score/all** returns an array of every score object from the database:
```json
[{
  "name": "garietyxxx",
  "score": 1000
}, {
  "name": "dave",
  "score": 1
}]
```
