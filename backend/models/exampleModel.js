const mongoose = require('mongoose');

const exampleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Example = mongoose.model('Example', exampleSchema);

module.exports = Example;
