import 'dotenv/config'
import * as grpc from 'grpc'

import authHandler, { GeoHandler, service, handler } from './handlers/CatalogHandler'
import CatalogService from './services/CatalogService'
import { CatalogServiceClient as ProtoAuthService } from './proto/catalog/catalog_grpc_pb'

const port: string | number = process.env.PORT || 3000

type StartServerType = (catalogService: CatalogService) => void
export const startServer: StartServerType = (catalogService: CatalogService): void => {
  // create a new gRPC server
  const server: grpc.Server = new grpc.Server()

  // register all the handler here...
  // @ts-ignore
  server.addService(service, handler)

  // define the host/port for server
  // @ts-ignore
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err: Error, port: number) => {
    if (err != null) {
      return console.error(err)
    }
    console.log(`gRPC listening on ${port}`)
  })

  // start the gRPC server
  server.start()
}

