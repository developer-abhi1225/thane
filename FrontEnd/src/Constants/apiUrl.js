console.log("REACT ENVS ", process.env.REACT_APP_BE_HOST);
console.log("REACT ENVS ", process.env.REACT_APP_BE_PORT);
export const APIURL = `http://${process.env.REACT_APP_BE_HOST}:${process.env.REACT_APP_BE_PORT}/`;
