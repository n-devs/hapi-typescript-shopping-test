import * as Hapi from "hapi";
import IRoute from "../../helper/route";
import Logger from "../../helper/logger";

export default class UserRoutes implements IRoute {
      public async register(server: Hapi.Server): Promise<any> {
            return new Promise(resolve => {
                  Logger.info('UserRoutes - Start adding user routes');

                  server.route([
                        {
                              method: 'GET',
                              path: '/',
                              handler: (request, h) => {

                                    return 'Hello World!';
                              }
                        }
                  ])

                  Logger.info('UserRoutes - Finish adding user routes');

                 resolve(server);
            })
      }
}

