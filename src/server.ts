import * as Hapi from "hapi";
import { config } from "dotenv";
import Logger from './helper/logger';

export default class Server {
      private static _instance: Hapi.Server;

      public static async start(): Promise<Hapi.Server> {
            try {
                  config({
                        path: `${process.cwd()}/.env`,
                  });

                  this._instance = new Hapi.Server({
                        port: process.env.PORT || "9000",
                        host: process.env.HOST || '0.0.0.0'
                  });

                  await this._instance.start();

                  Logger.info(
                        `Server - Up and running at http://${process.env.HOST}:${process.env.PORT}`
                  );

                  return this._instance;

            } catch (err) {
                  throw err
            }
      }

}

