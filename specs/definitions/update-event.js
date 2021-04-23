module.exports = [
    {
        name: "update-event",
        properties: {

            title: {
                type: "string",
                default: "",
            },
            description: {
                type: "string",
                default: "",
            },
            start: {
                type: "date"
            },
            end: {
                type: "date"
            },
        }
    }
];