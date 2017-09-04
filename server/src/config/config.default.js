module.exports = {
  cache: {
    redisHost: 'redis', // Default host, port, db number for docker container
    redisPort: 6379,
    redisDatabaseNumber: 0,
    defaultCacheTTL: 60 * 2, // 2 minutes
    triviaWidgetTTL: 60 * 60 * 2, // 2 hours
    statusCakeHistoryTTL: 60 * 10,  // 10 minutes due to API call limit
  },
  statusCake: {
    apiUrl: 'https://app.statuscake.com/API/Tests/Periods',
  },
  trivia: {
    baseUrl: 'http://numbersapi.com',
  },
};
