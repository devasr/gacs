
# GACS


## Getting Started

To start project, clone this repo and run:

`npm install`

Then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Devlopment Build

Run `ng build` or `ng build --dev` to build the project in development build, the api will be hit to development server. The build artifacts will be stored in the `dist/` directory.

## Production Build

Run `ng build --prod` to build the project in production build, the api will be hit to production/live server. The build artifacts will be stored in the `dist/` directory.

## Configuration Files

Configuration files for building application is located inside `src->environments` folder. There are two files present:
1. environment.prod.ts -> this file contents will used for production build environment. All the keys/value located in this file can only be accessed in prodcution build.

For production build `production` key value must be set to `true`.

2. environment.ts -> this file contents will used for development build environment. All the keys/value located in this file can only be accessed in development build. 

```
For developmet build `production` key value must be set to `false`.

You can add more keys/values as per your requirment.


