
## install local file version

 - in original repo for moesif-aws-lambda, ran `npm pack` to pack a local package.
 - set package.json of this example repo to reference the local file like this:
```
"moesif-aws-lambda": "file:/../moesif-aws-lambda-nodejs/moesif-aws-lambda-2.0.3.tgz"
```

