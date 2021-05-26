// package: geo
// file: catalog.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Empty extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Empty.AsObject;
    static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Empty;
    static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
    export type AsObject = {
    }
}

export class Catalog extends jspb.Message { 
    clearProductList(): void;
    getProductList(): Array<Product>;
    setProductList(value: Array<Product>): Catalog;
    addProduct(value?: Product, index?: number): Product;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Catalog.AsObject;
    static toObject(includeInstance: boolean, msg: Catalog): Catalog.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Catalog, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Catalog;
    static deserializeBinaryFromReader(message: Catalog, reader: jspb.BinaryReader): Catalog;
}

export namespace Catalog {
    export type AsObject = {
        productList: Array<Product.AsObject>,
    }
}

export class Product extends jspb.Message { 
    getLabel(): string;
    setLabel(value: string): Product;
    getDescription(): string;
    setDescription(value: string): Product;
    getPrice(): string;
    setPrice(value: string): Product;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Product.AsObject;
    static toObject(includeInstance: boolean, msg: Product): Product.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Product, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Product;
    static deserializeBinaryFromReader(message: Product, reader: jspb.BinaryReader): Product;
}

export namespace Product {
    export type AsObject = {
        label: string,
        description: string,
        price: string,
    }
}
