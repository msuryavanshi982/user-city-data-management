const cityModel = require('../models/cityModel');

//=====create City API==================>>>

const createCity = async function (req, res) {

    try {
        const data = req.body;
        const { city } = data;

        const isValidName = function (value) {
            if (typeof value === "undefined" || value === null || value == " ")
                return false;
            if (typeof value === "string" && value.trim().length > 0 && value.match(/^[a-zA-Z]*$/))
                return true;
            return false;
        }

        if (!isValidName(city))
            return res.status(400).send({ status: false, message: "city name is not valid" })

        let duplicatecity = await cityModel.findOne({ city: city });
        if (duplicatecity)
            return res.status(400).send({ status: false, message: "This city is already present" });


        let createData = await cityModel.create(data);
        res.status(201).send({ status: true, msg: "City added sucessfully", data: createData });

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}

//=====get City API==================>>>

const getCities = async function (req, res) {

    try {

        const cities = await cityModel.find();
        return res.status(200).send({ status: true, msg: "All the cities", data: cities });

    } catch (error) {

        res.status(500).send({ status: false, msg: error.message });
    }
}

module.exports = { createCity, getCities }