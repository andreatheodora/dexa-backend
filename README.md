<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Routes

All routes except **/auth** are protected with JWT Guard and can only be accessed after logging in.

### 1. Auth (/auth)

**1. POST /auth/login**

- Body params:
  1. email: string
  2. password: string

**2. POST /auth/signup**

- Body params:
  1. email: string
  2. password: string (min. length 8)
  3. name: string
  4. position: string (optional)
  5. division: string (optional)
  6. salary_gross: number (optional)
  7. address_line1: string (optional)
  8. address_line2: string (optional)
  9. city: string (optional)
  10. province: string (optional)
  11. postal_code: string (optional)
  12. is_hr: boolean

<br>

### 2. Attendance

**1. GET /attendance/tap-in**

- Creates new attendance based on token credentials and server timestamp
- User can only tap in once per day

**2. GET /attendance/tap-out**

- Adds tap out time to today's attendance based on token credentials and server timestamp
- User cannot tap out before tapping in
- User can only tap out once per day

**3. GET /attendance/today**
<br>Checks user attendance status at a given moment

```json
//Example when user has tapped in
{
  "status": "IN",
  "tap_in_time": "2025-09-16T08:00:00.000Z"
}
```

```json
//Example when user has tapped out for the day
{
  "status": "OUT",
  "tap_in_time": "2025-09-16T08:00:00.000Z",
  "tap_out_time": "2025-09-16T16:00:00.000Z"
}
```

**4. GET /attendance**

- HR-only route
- Returns attendance of active users
- Query params:
  1. year: int (optional)
  2. month: int (optional)
  3. date: int (optional)
  4. page: int (optional)
  5. count: int (optional)
  6. user_document_no: string (optional)

**5. GET /attendance/:user**

- Returns user's own attendance

- Query params:
  1. year: int (optional)
  2. month: int (optional)
  3. date: int (optional)
  4. page: int (optional)
  5. count: int (optional)
  6. user_document_no: string (optional)

<br>

### 3. Upload (/upload)

**1. POST /upload/supabase**

- Uploads image to Supabase and inserts image path to Attendance table
- Params:
  1. file: image

<br>

### 4. User (/user)

All routes in /user are **HR-only** routes

**1. GET /user**

- Fetches all users
- Query params:
  1. document_no: string (optional)
  2. page: number (optional)
  3. count: number (optional)

**2. PATCH /user/:user**

- Updates user data
- Body params:
  1. email: string (optional)
  2. password: string (min. length 8) (optional)
  3. name: string (optional)
  4. position: string (optional)
  5. division: string (optional)
  6. salary_gross: number (optional)
  7. address_line1: string (optional)
  8. address_line2: string (optional)
  9. city: string (optional)
  10. province: string (optional)
  11. postal_code: string (optional)
  12. is_hr: boolean (optional)
  13. is_deleted: boolean (optional)

**3. DELETE /user/:user**

- Sets `is_deleted` in User table to _true_
