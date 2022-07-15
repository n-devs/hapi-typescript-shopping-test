import * as Hapi from "hapi";
import { config } from "dotenv";
import Logger from "./helper/logger";
import Router from "./router";
import Plugins from "./plugin";

export default class Server {
      private static _instance: Hapi.Server;

      public static async start(): Promise<Hapi.Server> {
            try {
                  config({
                        path: `${process.cwd()}/.env`,
                  });

                  this._instance = new Hapi.Server({
                        port: process.env.PORT || "9000",
                        host: process.env.HOST || 'localhost'
                  });

                  await Plugins.registerAll(this._instance);
                  await Router.loadRoutes(this._instance);

                  await this._instance.start();

                  Logger.info(
                        `Server - Up and running at http://${process.env.HOST}:${process.env.PORT}`
                  );

                  return this._instance;

            } catch (err) {
                  Logger.info(`Server - There was something wrong: ${err}`);

                  throw err
            }
      }

      public static stop(): Promise<Error | void> {
            Logger.info(`Server - Stopping execution`);

            return this._instance.stop();
      }

      public static async recycle(): Promise<Hapi.Server> {
            Logger.info(`Server - Recycling instance`);

            await this.stop();

            return await this.start();
      }

      public static instance(): Hapi.Server {
            return this._instance;
      }

      public static async inject(
            options: string | Hapi.ServerInjectOptions
      ): Promise<Hapi.ServerInjectResponse> {
            return await this._instance.inject(options);
      }

}

