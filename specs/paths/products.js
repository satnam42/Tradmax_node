module.exports = [

    // {
    //     url: "/list",
    //     get: {
    //         summary: "get product List",
    //         description: "get all product",
    //         parameters: [
    //             {
    //                 in: "query",
    //                 type: "integer",
    //                 name: "pageNo",
    //                 description: "pageNo",
    //                 required: false
    //             },
    //             {
    //                 in: "query",
    //                 type: "integer",
    //                 name: "pageSize",
    //                 description: "pageSize",
    //                 required: false
    //             },
    //             {
    //                 in: "query",
    //                 type: "string",
    //                 name: "role",
    //                 description: "customer, vendor, admin",
    //                 required: false
    //             },
    //             {
    //                 in: "query",
    //                 type: "string",
    //                 name: "storeId",
    //                 description: "if role = 'customer' then fill storeId",
    //                 required: false
    //             },
    //             {
    //                 in: "query",
    //                 type: "string",
    //                 name: "userId",
    //                 description: "if role = 'customer' and storId has value then fill userId",
    //                 required: false
    //             },
    //             {
    //                 in: "query",
    //                 type: "boolean",
    //                 name: "excludeCustomerGroup",
    //                 description: "true,false",
    //                 default: false,
    //                 required: false

    //             },
    //             {
    //                 in: "query",
    //                 type: "string",
    //                 name: "customerGroup",
    //                 description: "only for Customer",
    //                 required: false

    //             },


    //         ],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // },
    // {
    //     url: "/listByVendor",
    //     get: {
    //         summary: "get product list  accroding to vendor",
    //         description: "get all product by vendor id",
    //         parameters: [
    //             {
    //                 in: "query",
    //                 type: "integer",
    //                 name: "pageNo",
    //                 description: "pageNo",
    //                 required: true
    //             },
    //             {
    //                 in: "query",
    //                 type: "integer",
    //                 name: "pageSize",
    //                 description: "pageSize",
    //                 required: true
    //             },
    //             {
    //                 in: "query",
    //                 type: "string",
    //                 name: "storeId",
    //                 description: "storeId",
    //                 required: true
    //             },

    //         ],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // },

    {
        url: "/addProduct",
        post: {
            summary: "create",
            description: "create",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of product creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/productCreate"
                    }
                }
            ],
            responses: {
                default: {
                    description: "Unexpected error",
                    schema: {
                        $ref: "#/definitions/Error"
                    }
                }
            }
        }
    },
    {
        url: "/uploadImage/{id}",
        put: {
            summary: "upload product image ",
            description: "upload product image ",
            parameters: [
                {
                    in: "formData",
                    name: "image",
                    type: "file",
                    description: "The file to upload.",
                    required: true,
                },
                {
                    in: "path",
                    name: "id",
                    description: "product id",
                    required: true,
                    type: "string"
                },
            ],
            responses: {
                default: {
                    description: "Unexpected error",
                    schema: {
                        $ref: "#/definitions/Error"
                    }
                }
            }
        }
    },
    // {
    //     url: "/addQuantity/{id}",
    //     put: {
    //         summary: "add Quantity ",
    //         description: "add product Quantity",
    //         parameters: [
    //             {
    //                 in: "path",
    //                 name: "id",
    //                 description: "product id",
    //                 required: true,
    //                 type: "string"
    //             },
    //             {
    //                 in: "query",
    //                 name: "quantity",
    //                 description: "add product quantity",
    //                 required: true,
    //                 type: "string"
    //             },

    //         ],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // },
    {
        url: "/update/{id}",
        put: {
            summary: "product",
            description: "update product by id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "product id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of asignVendor",
                    required: true,
                    schema: {
                        $ref: "#/definitions/productUpdate"
                    }
                },

            ],
            responses: {
                default: {
                    description: "Unexpected error",
                    schema: {
                        $ref: "#/definitions/Error"
                    }
                }
            }
        }
    },
    {
        url: "/deleteProduct/{id}",
        delete: {
            summary: "delete product",
            description: "delete product by Id",
            parameters: [{
                in: "path",
                name: "id",
                description: "product Id",
                required: true,
                type: "string"
            },
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            }
            ],
            responses: {
                default: {
                    description: "Unexpected error",
                    schema: {
                        $ref: "#/definitions/Error"
                    }
                }
            }
        }
    }

];
