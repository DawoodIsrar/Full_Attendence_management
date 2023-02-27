/** @format */

export const config = () => {
  let env = process.env.NODE_ENV
  if (env === 'development') {
    return {
      apiUrl: 'http://localhost:8080/',
      env: env,
    }
  } else if (env === 'staging') {
    return {
      apiUrl: 'http://localhost:8080/',
      env: env,
    }
  } else if (env === 'production') {
    return {
      apiUrl: 'http://localhost:8080/',
      env: env,
    }
  }
}
