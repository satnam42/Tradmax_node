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
//     {
//         url: "/listByUserId/{id}",
//         get: {
//             summary: "list by user Id",
//             description: "event list by user id",
//             parameters: [
//                 {
//                     in: "path",
//                     name: "id",
//                     description: "user id",
//                     required: true,
//                     type: "string"
//                 },
//                 // {
//                 //     in: "header",
//                 //     name: "x-access-token",
//                 //     description: "token to access api",
//                 //     required: true,
//                 //     type: "string"
//                 // }
//             ],
//             responses: {
//                 default: {
//                     description: "Unexpected error",
//                     schema: {
//                         $ref: "#/definitions/Error"
//                     }
//                 }
//             }
//         }
//     },
//     {
//         url: "/list",
//         get: {
//             summary: "list",
//             description: "event list",
//             parameters: [
//                 // {
//                 //     in: "header",
//                 //     name: "x-access-token",
//                 //     description: "token to access api",
//                 //     required: true,
//                 //     type: "string"
//                 // }
//             ],
//             responses: {
//                 default: {
//                     description: "Unexpected error",
//                     schema: {
//                         $ref: "#/definitions/Error"
//                     }
//                 }
//             }
//         }
//     },
//     {
//         url: "/update/{id}",
//         put: {
//             summary: "update",
//             description: "update event",
//             parameters: [
//                 {
//                     in: "path",
//                     name: "id",
//                     description: "event id",
//                     required: true,
//                     type: "string"
//                 },
//                 // {
//                 //     in: "header",
//                 //     name: "x-access-token",
//                 //     description: "token to access api",
//                 //     required: true,
//                 //     type: "string"
//                 // }
//             ],
//             responses: {
//                 default: {
//                     description: "Unexpected error",
//                     schema: {
//                         $ref: "#/definitions/Error"
//                     }
//                 }
//             }
//         }
//     },
//     {
//         url: "/remove/{id}",
//         delete: {
//             summary: "delete",
//             description: "delete event by id",
//             parameters: [
//                 {
//                     in: "path",
//                     name: "id",
//                     description: "event id",
//                     required: true,
//                     type: "string"
//                 },
//                 // {
//                 //     in: "header",
//                 //     name: "x-access-token",
//                 //     description: "token to access api",
//                 //     required: true,
//                 //     type: "string"
//                 // }
//             ],
//             responses: {
//                 default: {
//                     description: "Unexpected error",
//                     schema: {
//                         $ref: "#/definitions/Error"
//                     }
//                 }
//             }
//         }
//     }
]