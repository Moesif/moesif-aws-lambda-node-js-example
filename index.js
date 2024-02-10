/**
 * This file is an example AWS Lambda function.
 */
const moesif = require('moesif-aws-lambda');
const https = require('https');
console.log('Loading function');

const moesifOptions = {

    applicationId: process.env.MOESIF_APPLICATION_ID,

    identifyUser: function (event, context) {
      const headers = {...event.headers};
      return headers['X-User-Id'] || headers['x-user-id'];
      // return event.requestContext && event.requestContext.identity && event.requestContext.identity.cognitoIdentityId
    },
    debug: true,
    // below is optional: but if you plan to metered billing, moesif have 1 to 1 mapping between company id and subscription id.
    //
    // - by providing a subscription id directly.
    // - or providing a companyId, and during setting up Billing provider, set up mapping from subscription id to company id.
    identifyCompany: function (event, context) {
      const headers = {...event.headers};
      return headers['X-Company-Id'] || headers['x-company-id'];
      // return 'some company id or subscription id';
    }
};

// var moesifMiddleware = moesif(moesifOptions);

// optional. only if you want to capture outgoing api calls.
// moesifMiddleware.startCaptureOutgoing();

const handler = function (event, context) {
  return Promise.resolve({
    statusCode: 201,
    body: JSON.stringify({ success: true })
  });
}

// exports.handler = function (event, context, callback) {
//     // Outgoing API call to third party
//     https.get(
//         {
//           host: 'jsonplaceholder.typicode.com',
//           path: '/posts/1'
//         },
//         function(res) {
//           var body = '';
//           res.on('data', function(d) {
//             body += d;
//           });

//           res.on('end', function() {
//             var parsed = JSON.parse(body);
//             console.log(parsed);
//           });
//         }
//       );

//     callback(null, {
//         statusCode: '200',
//         body: JSON.stringify({key: 'hello world'}),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// };

// Async Functions
// For more details, please refer to - https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html.

// exports.handler = async (event, context) => {
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify({ message: 'hello world' })
//   }
//   return response
// }

exports.handler = moesif(moesifOptions, handler);
