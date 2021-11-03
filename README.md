# Greater Chicago Food Depository - Frontend UI

## Current Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/3a338fa4-8edb-41a6-ac06-4e4295a895ad/deploy-status)](https://app.netlify.com/sites/cfc-mapping/deploys)

View deployed site [here](https://cfc-mapping.netlify.app/).

## Development
### Local API Key Configuration
To protect any API keys during production they should not be hard-coded into the application. 
Any API Keys should instead be stored at the root of the project directory in a .env file, which are already 
setup to be ignored by git. Variables in a .env file can be accessed anywhere throught the app as: 

    process.env.REACT_APP_API_VARIABLE_NAME.

For more info on .env files: https://create-react-app.dev/docs/adding-custom-environment-variables/

#### API Keys and Corresponding Variable Names: 
- MapBox: REACT_APP_MAPBOX_API_KEY

### JSON Format for data consumed by the frontend:
Data for both counties and zipcodes should be in the form of a list of key,value pairs.
of the corresponding data to that county.

#### County Level Format: 
The keys for counties should be the State + County FIPS codes in string format:
State FIPS codes are two digits (Illinois' is "17") and the County FIPS codes are always 3 digits.
Not all datasets will combine these two, so in processing data it may be necessary to do this step.
In the example below, the first key is "17001" which equals Illinois + Adams County.

    {
        "17001": {
            "metric_one": 1234,
            "metric_two": 4321,
            ...
        }, 
        "17002": {
            "metric_one": 1234,
            "metric_two": 4321,
            ...
        }, 
        ...
    }

#### Zipcode Level Format: 
The keys for zipcodes should be the 5-digit long zipcode number in string format.

    {
        "60610": {
            "metric_one": 1234,
            "metric_two": 4321,
            ...
        }, 
        "60611": {
            "metric_one": 1234,
            "metric_two": 4321,
            ...
        }, 
        ...
    }


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
