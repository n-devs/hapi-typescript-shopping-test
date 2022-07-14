"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hapi = require("@hapi/hapi");
const Logs = require("./plugins/logging");
function init(configs, database) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const port = process.env.PORT || configs.port;
            const server = new Hapi.Server({
                debug: { request: ['error'] },
                port: port,
                routes: {
                    cors: {
                        origin: ["*"]
                    }
                }
            });
            if (configs.routePrefix) {
                server.realm.modifiers.route.prefix = configs.routePrefix;
            }
            //  Setup Hapi Plugins
            const plugins = configs.plugins;
            const pluginOptions = {
                database: database,
                serverConfigs: configs
            };
            let pluginPromises = [];
            plugins.forEach((pluginName) => {
                var plugin = require("./plugins/" + pluginName).default();
                console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
                pluginPromises.push(plugin.register(server, pluginOptions));
            });
            yield Promise.all(pluginPromises);
            console.log("All plugins registered successfully.");
            console.log("Register Routes");
            Logs.init(server, configs, database);
            //     Tasks.init(server, configs, database);
            //     Users.init(server, configs, database);
            console.log("Routes registered sucessfully.");
            return server;
        }
        catch (err) {
            console.log("Error starting server: ", err);
            throw err;
        }
    });
}
exports.init = init;
//# sourceMappingURL=server.js.map