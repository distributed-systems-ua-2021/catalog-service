// package: geo
// file: catalog.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as catalog_pb from "./catalog_pb";

interface ICatalogServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getCatalog: ICatalogServiceService_IGetCatalog;
}

interface ICatalogServiceService_IGetCatalog extends grpc.MethodDefinition<catalog_pb.Empty, catalog_pb.Catalog> {
    path: "/geo.CatalogService/GetCatalog";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<catalog_pb.Empty>;
    requestDeserialize: grpc.deserialize<catalog_pb.Empty>;
    responseSerialize: grpc.serialize<catalog_pb.Catalog>;
    responseDeserialize: grpc.deserialize<catalog_pb.Catalog>;
}

export const CatalogServiceService: ICatalogServiceService;

export interface ICatalogServiceServer {
    getCatalog: grpc.handleUnaryCall<catalog_pb.Empty, catalog_pb.Catalog>;
}

export interface ICatalogServiceClient {
    getCatalog(request: catalog_pb.Empty, callback: (error: grpc.ServiceError | null, response: catalog_pb.Catalog) => void): grpc.ClientUnaryCall;
    getCatalog(request: catalog_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: catalog_pb.Catalog) => void): grpc.ClientUnaryCall;
    getCatalog(request: catalog_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: catalog_pb.Catalog) => void): grpc.ClientUnaryCall;
}

export class CatalogServiceClient extends grpc.Client implements ICatalogServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getCatalog(request: catalog_pb.Empty, callback: (error: grpc.ServiceError | null, response: catalog_pb.Catalog) => void): grpc.ClientUnaryCall;
    public getCatalog(request: catalog_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: catalog_pb.Catalog) => void): grpc.ClientUnaryCall;
    public getCatalog(request: catalog_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: catalog_pb.Catalog) => void): grpc.ClientUnaryCall;
}
