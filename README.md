# Moesif AWS Lambda Example for Node.js

[Moesif](https://www.moesif.com) is an API analytics platform.
[moesif-aws-lambda-nodejs](https://github.com/Moesif/moesif-aws-lambda-nodejs)
is a middleware that logs API calls to Moesif for AWS Lambda.

This example is an express application with Moesif's API analytics and monitoring integrated.


## How to run this example.

Create a new AWS Lambda function that is triggered by AWS API Gateway

Upload this zip, when prompted for handler, enter `index.handler`

You will also want to add an environment variable `MOESIF_APPLICATION_ID` with the value being your
application id from your Moesif account

Go to the URL for the API gateway such as https://XXXXXX.execute-api.us-west-2.amazonaws.com/default/my-test-function

The API Calls should show up in Moesif.

