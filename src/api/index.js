import axios from 'axios';

const IP_URL = 'http://ip-api.com/json';

const TOP_HEADLINES = (country) =>
  `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=29ec909f68cf4ceeb5a300eddef2cdb0`;

export const getAllNewsByCountry = async (country = 'us') => {
  try {
    const news = await axios.get(TOP_HEADLINES(country));
    if (news.status === 'ok') {
      return news.data;
    }
  } catch (error) {
    console.error('error @getAllNewsByCountry:', error);
  }
};
