const AWS = require("aws-sdk");
const axios = require("axios");

// Initialize DynamoDB Document Client
const docClient = new AWS.DynamoDB.DocumentClient();

// Environment Variables
const TABLE_NAME = process.env.TABLE_NAME;
const API_URL = process.env.API_URL;

// Lambda Handler
exports.handler = async (event) => {
  try {
    // Fetch data from the external API
    const response = await axios.get(API_URL);
    const data = response.data;

    // Process and transform data as needed
    const processedData = processData(data);

    // Save processed data to DynamoDB
    await saveToDynamoDB(processedData);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data processed and stored successfully",
        data: processedData,
      }),
    };
  } catch (error) {
    console.error("Error processing data:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error processing data",
        error: error.message,
      }),
    };
  }
};

// Function to process and transform data
function processData(data) {
  // Example transformation logic
  return data.map((item) => ({
    Id: item.id.toString(),
    Name: item.name,
    Timestamp: new Date().toISOString(),
  }));
}

// Function to save data to DynamoDB
async function saveToDynamoDB(data) {
  const putRequests = data.map((item) => ({
    PutRequest: {
      Item: item,
    },
  }));

  const params = {
    RequestItems: {
      [TABLE_NAME]: putRequests,
    },
  };

  await docClient.batchWrite(params).promise();
}
