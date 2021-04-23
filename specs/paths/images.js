// module.exports = [
//     {
//         url: "/remove/",
//         put: {
//             summary: "remove",
//             description: "removeImage",
//             parameters: [
//                 {
//                     in: "query",
//                     type: "string",
//                     name: "id",
//                     required: true,
//                 },
//                 {
//                     in: "query",
//                     type: "string",
//                     name: "imageId",
//                     required: true,
//                 },
//                 {
//                     in: "query",
//                     type: "string",
//                     name: "image",
//                     required: true,
//                 },
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

// ]