import dotenv from 'dotenv';

dotenv.config();

function required(key, defaultValue = undefined) {
  const requiredValue = process.env[key] || defaultValue;
  if (requiredValue === undefined) {
    throw new Error(`key [${key}] is undefined`);
  }
  return requiredValue;
}

const config = {
  naverBookingURL: required('NAVER_BOOKING_URL'),
  naverBookingRefererURL: required('NAVER_BOOKING_REFERER_URL'),
  teamsAppURL: required('TEAMS_APP_URL'),
};

export default config;
