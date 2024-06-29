export const getBaseURL = () => {
  if (process.env.NODE_ENV === "production") {
    return import.meta.env.VITE_BASE_URL_PROD;
  } else {
    return import.meta.env.VITE_BASE_URL_DEV;
  }
};
