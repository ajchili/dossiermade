# dossiermade
A website to host videography work done by @elijahcutler and @ajchili.

__All videography and photography work hosted on this website is not to be used without the explicit permission of @elijahcutler or @ajchili.__


## Development

1. Fork repository
2. Create a `.env.local` file in the project directory with the following structure
    ```
    REACT_APP_API_KEY=...
    REACT_APP_AUTH_DOMAIN=...
    REACT_APP_DATABASE_URL=...
    REACT_APP_PROJECT_ID=...
    REACT_APP_STORAGE_BUCKET=...
    REACT_APP_MESSAGE_SENDER_ID=...
    REACT_APP_APP_ID=...
    ```
    _Set the values in the `.env.local` file to those obtained from a Firebase web app_
3. Run `npm i` in the project directory
4. Run `npm run start` in the project directory
5. Develop

## Deployment
The dossiermade website has automatic deployment based on CircleCI. Any push to the master branch will result in a new deployment of the website (so long as it is build and tested successfully). Should a manual deployment be necessary, run `npm run deploy` in the project directory (_requires that `firebase-tools` is installed and that machine is authenticated with account that is attached to project in GCP/Firebase_).