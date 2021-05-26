
import { DiscoveryService } from "./discovery/discoveryService";
import { protoIndex } from "./proto"
import { startServer } from "./server";
import CatalogService , { ConfigurationProvider } from './services/CatalogService'
const { networkInterfaces } = require('os');


function localIp(): string {
    const nets = networkInterfaces();

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal && (name=="eth0" || name === "en0")) {
                return net.address;
            }
        }
    }
}

const init = async () => {
    protoIndex()
    const geoService = new CatalogService()
    startServer(geoService)

    const ip = localIp();
    console.log("Running on ", ip)

    const serv = geoService as ConfigurationProvider

    const discoveryService = new DiscoveryService(ip, geoService.getConfigurationHandler());

    await discoveryService.getLease();


    discoveryService.getHosts().then(str => {
        console.log("Hosts: " + str)
    })
  }
  
  init();