// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var catalog_pb = require('./catalog_pb.js');

function serialize_geo_Catalog(arg) {
  if (!(arg instanceof catalog_pb.Catalog)) {
    throw new Error('Expected argument of type geo.Catalog');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_geo_Catalog(buffer_arg) {
  return catalog_pb.Catalog.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_geo_Empty(arg) {
  if (!(arg instanceof catalog_pb.Empty)) {
    throw new Error('Expected argument of type geo.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_geo_Empty(buffer_arg) {
  return catalog_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var CatalogServiceService = exports.CatalogServiceService = {
  getCatalog: {
    path: '/geo.CatalogService/GetCatalog',
    requestStream: false,
    responseStream: false,
    requestType: catalog_pb.Empty,
    responseType: catalog_pb.Catalog,
    requestSerialize: serialize_geo_Empty,
    requestDeserialize: deserialize_geo_Empty,
    responseSerialize: serialize_geo_Catalog,
    responseDeserialize: deserialize_geo_Catalog,
  },
};

exports.CatalogServiceClient = grpc.makeGenericClientConstructor(CatalogServiceService);
