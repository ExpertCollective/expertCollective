REST API services for the [ExpertCollective.org](https://expertcollective.org) web app.

This should be used by a Reverse Proxy service and not actually exposed publicly.  The EC Web App should redirect `/api` calls to this service. It needs to run on NodeJS.

## Development server

First build the TypeScript into JavaScript, run this command: `tsc` 

In development, run this command: `npm run devRest` for a dev server. Navigate to [http://localhost:8000/api](http://localhost:8000/api). 