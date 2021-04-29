[![GitHub license](https://img.shields.io/github/license/JBurgosDev/typeorm-easy-paginate)](https://github.com/JBurgosDev/typeorm-easy-paginate)
[![GitHub stars](https://img.shields.io/github/stars/JBurgosDev/typeorm-easy-paginate)](https://github.com/JBurgosDev/typeorm-easy-paginate/stargazers)
![GitHub issues](https://img.shields.io/github/issues/JburgosDev/typeorm-easy-paginate?color=red)
![GitHub package.json version](https://img.shields.io/github/package-json/v/JburgosDev/typeorm-easy-paginate)
# typeorm-easy-paginate
The fast and easy way to create paging objects in Express with TypeORM

## Installation
### Pre-requisites:
- typeorm

#### NPM:
```
npm install typeorm-easy-paginate
```
##### Yarn
```
yarn add typeorm-easy-paginate
```
## Usage
Import the plugin where you want to use it

```ts
import { paginate } from "typeorm-easy-paginate";
```
Now we can start paging our queries.

We create our controller and call the function `paginate`

```ts
import { Response, Request } from 'express';
import { Example } from "../entity/example";
import { paginate } from "typeorm-easy-paginate";

// Example controller
export class exampleController {
    public async example(req: Request, res: Response) {
        
        /* Replace 'Example' with your entity */
        const paginateList = await paginate<Example>(Example, { /*Paginate options here*/ }, {/*TypeOrm repository querys here*/});

        return res.json(paginateList)
    }
}
```
In the paging options you can pass the page, and the number of records per page either manually or from query params.


#### NOTE: 
By default it will always start from page 1.

If you do not pass the number of records per page, the total number of records in the table will be taken by default

```ts
const paginateList = await paginate<Example>(Example, {page: 1, perPage: 10}, {});
```

You can pass options from query params. You must convert it to numeric like this

```ts
let page = parseInt(<string>req.params.page);
let perPage = parseInt(<string>req.params.perPage);
```

And now you can pass to the options

```ts
const paginateList = await paginate<Example>(Example, {page, perPage}, {});
```

#### Query
In addition to the paging options, you can make queries like these.

__PD__: You can use all FindOptions of TypeORM

```ts
const paginateList = await paginate<Example>(Example, {page, perPage}, {where: { firstName: "Timber" }});
```

#### Request:
You can make the url like this

```http request
http://localhost:3000/api/jobs?page=1&perPage=15
```
Or
```http request
http://localhost:3000/api/jobs
```

#### Example result:
```json
{
  "content": [
    {
      "id": 13,
      "job": "001"
    },
    {
      "id": 14,
      "job": "002"
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 2,
    "totalPage": 30,
    "totalItems": 60
  }
}
```

## Contributions:
If you like to make a contribution you can send a PR, I will be very grateful for your help.
[PULL REQUESTS](https://github.com/JBurgosDev/typeorm-easy-paginate/pulls)
