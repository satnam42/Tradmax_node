module.exports = [{
        url: "/register",
        post: {
            summary: "create",
            description: "create",
            parameters: [{ in: "body",
                name: "body",
                description: "Model of user creation",
                required: true,
                schema: {
                    $ref: "#/definitions/userCreate"
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
        url: "/socialLink",
        post: {
            summary: "Login user with socialLink",
            description: "user login into system with socialLink and get its token to access apis",
            parameters: [{ in: "body",
                name: "body",
                description: "Model of login user with socialLink",
                required: true,
                schema: {
                    $ref: "#/definitions/socialLink"
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
        url: "/adminlogin",
        post: {
            summary: "Admin Login",
            description: "login",
            parameters: [{ in: "body",
                name: "body",
                description: "Model of Admin login",
                required: true,
                schema: {
                    $ref: "#/definitions/login"
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
        url: "/login",
        post: {
            summary: "login",
            description: "login",
            parameters: [{ in: "body",
                name: "body",
                description: "Model of user login",
                required: true,
                schema: {
                    $ref: "#/definitions/login"
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
        url: "/changePassword/{id}",
        put: {
            summary: "Change Password",
            description: "reset Password",
            parameters: [{ in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                },
                { in: "path",
                    name: "id",
                    description: "user id",
                    required: true,
                    type: "string"
                },

                { in: "body",
                    name: "body",
                    description: "Model of changePassword user",
                    required: true,
                    schema: {
                        $ref: "#/definitions/resetPassword"
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
        url: "/otpVerifyAndChangePassword",
        post: {
            summary: "Verify otp and change Password",
            description: "erify otp and change Password",
            parameters: [{ in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                },
                { in: "body",
                    name: "body",
                    description: "Model of verifyOtp",
                    required: true,
                    schema: {
                        $ref: "#/definitions/verifyOtp"
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
        url: "/newPassword",
        put: {
            summary: "Set New Password",
            description: "Set new Password",
            parameters: [{ in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                },

                { in: "body",
                    name: "body",
                    description: "Model of newPassword",
                    required: true,
                    schema: {
                        $ref: "#/definitions/newPassword"
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
        url: "/forgotPassword",
        post: {
            summary: "forgotPassword",
            description: "forgotPassword",
            parameters: [{ in: "body",
                name: "body",
                description: "Model of forgotPassword",
                required: true,
                schema: {
                    $ref: "#/definitions/forgotPassword"
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
        url: "/getUsers",
        get: {
            summary: "getUsers",
            description: "Just hit the api without pass any param",
            parameters: [
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: false,
                    type: "string"
                }, {
                    in: 'query',
                    type: "integer",
                    name: 'pageNo',
                    description: 'pageNo',
                    required: true,
                }, {
                    in: 'query',
                    type: "integer",
                    name: 'pageSize',
                    description: 'pageSize',
                    required: true,
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
        url: "/currentUser/{id}",
        get: {
            summary: "currentUser",
            description: "currentUser",
            parameters: [
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                },
                {
                    in: "path",
                    type: "string",
                    name: "id",
                    description: "user id",
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
        url: "/delete/{id}",
        delete: {
            summary: "delete",
            description: "delete",
            parameters: [
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                },
                {
                    in: "path",
                    type: "string",
                    name: "id",
                    description: "user id",
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
        url: "/update/{id}",
        put: {
            summary: "update",
            description: "update",
            parameters: [
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: false,
                    type: "string"
                },
                {
                    in: "path",
                    type: "string",
                    name: "id",
                    description: "user id",
                    required: true
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of user login",
                    required: true,
                    schema: {
                        $ref: "#/definitions/updateUser"
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
    // {
    //     url: "/uploadProfilePic/{id}",
    //     put: {
    //         summary: "upload Profile Pic ",
    //         description: "upload Profile Pic ",
    //         parameters: [{
    //             in: "formData",
    //             name: "image",
    //             type: "file",
    //             description: "The file to upload.",
    //             required: true,
    //         },
    //         {
    //             in: "path",
    //             type: "string",
    //             name: "id",
    //             description: "user id",
    //             required: true
    //         }
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
        url: "/uploadImage",
        post: {
            summary: "uploadImage",
            description: "uploadImage",
            parameters: [{ in: "formData",
                    type: "string",
                    name: "id",
                    description: "User Id",
                    required: true
                },
                { in: "formData",
                    name: "file",
                    type: "file",
                    description: "The Signature file to upload.",
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
];