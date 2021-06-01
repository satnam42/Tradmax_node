module.exports = [
    {
        url: "/createBanner",
        post: {
            summary: "add Banner",
            description: "add Banner",
            parameters: [{ 
                in: "formData",
                name: "title",
                type: "string",
                description: "banner title",
                required: true
            },
            { 
                in: "formData",
                name: "file",
                type: "file",
                description: "The banner file to upload.",
                required: true
            },],
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
        url: "/getBanners",
        get: {
            summary: "getBanner",
            description: "Just hit the api without pass any param",
            parameters: [
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: false,
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
    },
    {
        url: "/delete/{id}",
        delete: {
            summary: "delete",
            description: "delete Category Or Subcategory by id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "Category Or Subcategory Id",
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
]