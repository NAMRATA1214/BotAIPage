import mockData from '../data/sampleData.json'

export const getAIResponse = async (userMessage) => {
  try {
    // Convert user message to lowercase for case-insensitive matching
    const lowerCaseMessage = userMessage.toLowerCase();

    // Search for the best match in the mock data
    const foundItem = mockData.find(item =>
      lowerCaseMessage.includes(item.question.toLowerCase())
    );

    // Return the response if a match is found; otherwise, return a generic message
    if (foundItem) {
      return foundItem.response;
    } else {
      return 'Sorry, I don\'t have an answer for that right now.';
    }
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Sorry, I am having trouble responding at the moment.';
  }
};
