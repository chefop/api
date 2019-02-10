[![Build Status](https://travis-ci.com/chefop/api.svg?branch=develop)](https://travis-ci.com/chefop/api)

# Application

ChefOp API

## Description

API for web app 📟

## Installation

Clone and install api.

```bash
git clone https://github.com/chefop/api.git
cd api/
npm install
```

## Launch

```bash
npm start
```
### Var :

```bash
SERV_ENV=dev nodemon server.js
```
> Set ENV to dev

> Launch nodemon

> Launch server.js

## Test

```
npm test
```
### Var :

```
SERV_ENV=test nyc mocha --timeout 10000
```
> Set ENV to test

> Launch nyc -> Istanbul

> Launch mocha -> test

> Set timeout to 10 secs

## License
[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
