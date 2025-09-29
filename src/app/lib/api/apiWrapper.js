// lib/api/apiWrapper.js
export async function withRetry(apiCall, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await apiCall();
      return result;
    } catch (error) {
      console.log(`API attempt ${attempt}/${maxRetries} failed:`, error.message);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

export async function safeApiCall(apiCall, fallbackData = []) {
  try {
    return await withRetry(apiCall, 2, 2000); // 2 retries with backoff
  } catch (error) {
    console.error('All API attempts failed, using fallback data');
    
    // In production, always return fallback data
    if (process.env.NODE_ENV === 'production') {
      return fallbackData;
    }
    
    // In development, you might want to see the actual error
    throw error;
  }
}