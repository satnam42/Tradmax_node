module.exports = [
    {
        url: "/createCategory",
        post: {
            summary: "add category",
            description: "add category",
            parameters: [{ 
                in: "formData",
                name: "name",
                type: "string",
                description: "Category Name",
                required: true
            },
            { 
                in: "formData",
                name: "file",
                type: "file",
                description: "The Category file to upload.",
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
        url: "/createSubCategory",
        post: {
            summary: "Add SubCategory",
            description: "Add SubCategory",
            parameters: [{ 
                in: "formData",
                name: "parent_id",
                type: "string",
                description: "Category Id",
                required: true
            },{ 
                in: "formData",
                name: "name",
                type: "string",
                description: "Subcategory Name",
                required: true
            },
            { 
                in: "formData",
                name: "file",
                type: "file",
                description: "The Image file to upload.",
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
        url: "/getCategories",
        post: {
            summary: "Get Categories and SubCategory",
            description: "Get Categories and SubCategory",
            parameters: [{ in: "body",
                name: "body",
                description: "Pass category Id here to get subcategories",
                required: false,
                schema: {
                    $ref: "#/definitions/getCategories"
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