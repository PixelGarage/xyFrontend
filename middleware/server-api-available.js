// Check if server is up before loading page
import axios from 'axios';

export default function (context) {
  const jsonApiServer = context.isDev ? process.env.jsonApiDevServer : process.env.jsonApiProdServer;
  const apiUrl = jsonApiServer + '/' + process.env.jsonApiPrefix;
  console.log(apiUrl);
debugger
  return axios.get(apiUrl).catch(e => {
    if (context.route.path !== '/server-unreachable') {
      context.redirect('/server-unreachable');
    }
  });
}
