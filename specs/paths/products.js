module.exports = [{
        url: "/addProduct",
        post: {
            summary: "create",
            description: "create",
            parameters: [{
                in: "body",
                name: "body",
                description: "Model of product creation",
                required: true,
                schema: {
                    $ref: "#/definitions/productCreate"
                }
            }],
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
        url: "/productsBySubCategories",
        get: {
            summary: "Homelisting API",
            description: "product  by SUbcategories",
            parameters: [{
                    in: "query",
                    type: "string",
                    name: "userId",
                    description: "pass user ID here",
                    required: true
                },{
                    in: "query",
                    type: "integer",
                    name: "pageNo",
                    description: "pageNo",
                    required: false
                },
                {
                    in: "query",
                    type: "integer",
                    name: "pageSize",
                    description: "pageSize",
                    required: false
                },{
                    in: "query",
                    type: "integer",
                    name: "pageSort",
                    description: "pass 1 for oldest and -1 for newest",
                    required: false
                },{
                    in: "query",
                    type: "integer",
                    name: "priceSort",
                    description: "low to high OR high to low",
                    required: false
                },
                {
                    in: "query",
                    type: "string",
                    name: "subCategoryId",
                    description: "pass subcat ID here",
                    required: true
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
        url: "/similarProducts",
        get: {
            summary: "Similar Products API",
            description: "product  by SUbcategories",
            parameters: [{
                    in: "query",
                    type: "string",
                    name: "subCategoryId",
                    description: "pass subcat ID here",
                    required: true
                },
                {
                    in: "query",
                    type: "string",
                    name: "productId",
                    description: "pass productId here",
                    required: true
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
        url: "/getAllProducts",
        get: {
            summary: "Homelisting API",
            description: "product  by SUbcategories",
            parameters: [{
                    in: "query",
                    type: "string",
                    name: "userId",
                    description: "pass user ID here",
                    required: false
                },
                {
                    in: "query",
                    type: "integer",
                    name: "pageNo",
                    description: "pageNo",
                    required: true
                },
                {
                    in: "query",
                    type: "integer",
                    name: "pageSize",
                    description: "pageSize",
                    required: true
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
        url: "/uploadProductFiles/{id}",
        put: {
            summary: "Upload product Files",
            description: "Upload product Files ",
            parameters: [{
                    in: "formData",
                    name: "files[]",
                    type: "file",
                    description: "The file to upload.",
                    required: true,
                },
                {
                    in: "path",
                    type: "string",
                    name: "id",
                    description: "product Id",
                    required: true
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
        url: '/filterProducts',
        post: {
            summary: 'filter Products',
            description: 'filter by property name',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Model of search property by name',
                required: true,
                schema: {
                    $ref: '#/definitions/searchProducts'
                }
            }],
            responses: {
                default: {
                    description: 'Unexpected error',
                    schema: {
                        $ref: '#/definitions/Error'
                    }
                }
            }
        }
    },
    {
        url: "/update/{id}",
        put: {
            summary: "product",
            description: "update product by id",
            parameters: [{
                    in: "path",
                    name: "id",
                    description: "product id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of product update",
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