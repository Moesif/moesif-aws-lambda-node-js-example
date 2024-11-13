const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();
const moesif = require('moesif-aws-lambda');

let moesifApplicationId = null


async function getMoesifApplicationId() {
  if (!moesifApplicationId) {
    try {
      const secretValue = await secretsManager.getSecretValue({ SecretId: 'your-secret-id' }).promise();
      // please double check if you need to parse or extract the ApplcationId from the secrete
      // value you get from secretesManager, since it depends how you store it.
      moesifApplicationId = secretValue;
      return moesifApplicationId;
    } catch (error) {
      console.error('Error fetching secret:', error);
      throw error;
    }
  } else {
    // already loaded:
    return moesifApplicationId;
  }
}


const createAsyncFetchSecreteMiddleware = (originalHandler) => {
  const newAsyncHandler = async (event, context) => {
    const appId = await getMoesifApplicationId();
    console.log('obatined', appId);
    return moesif(moesifOptions, originalHandler)(event, context);
  }
  return newAsyncHandler;
}

