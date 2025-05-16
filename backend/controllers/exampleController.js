const asyncHandler = require('../middleware/asyncHanddler.js');
const Example = require('../models/exampleModel.js');

// @desc    Get all examples
// @route   GET /api/example
// @access  Public
const getExamples = asyncHandler(async (req, res) => {
    const examples = await Example.find();
    res.json(examples);
});

// @desc    Create a new example
// @route   POST /api/example
// @access  Public
const createExample = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const example = new Example({
        name,
        description,
    });

    const createdExample = await example.save();
    res.status(201).json(createdExample);
});

module.exports = { getExamples, createExample };
