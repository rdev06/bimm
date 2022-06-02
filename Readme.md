# Vehicle Parser App
## _Node.js application, which sync the vehicle details in document db(used mongodb) and then send the data to client as per requirement._

## Tech

Parser app uses a number of open source projects to work properly:

- [node.js] - Js Framework
- [jest] - Test Framework

## Installation

Requires [Node.js](https://nodejs.org/) v16+ to run.
Dev done on _v16.14.2_

Install the dependencies and devDependencies.

```sh
cd bimm
npm i
```

### Execute

```sh
npm start
```

### Test

```sh
npm test
```

### Set Env Variable

Change the value of .env file in the root level

### Usage

_With default Value_

navigate to [http://localhost:3000](http://localhost:3000)

_With Optional Query Parama_

[http://localhost:3000?offset=20&limit=20](http://localhost:3000?offset=20&limit=20)

And Pagination values are sent via headers i.e totalCount, offset, limit



NOTE: _I added only one test case as a sample_
