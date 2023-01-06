const userModel = require("../models/userModel");
const cityModel = require("../models/cityModel")
const validUrl = require("is-valid-http-url");
const axios = require('axios')

//----Name Validation----
const isValidName = function (value) {
    if (typeof value === "undefined" || value === null || value == " ")
        return false;
    if (typeof value === "string" && value.trim().length > 0 && value.match(/^[a-zA-Z ]*$/))
        return true;
    return false;
}


//---mobile validation---
const isValidmobile = function (value) {
    return (/^[\s]*[6-9]\d{9}[\s]*$/gi).test(value)
}

//=====create user API==================>>>

const createUser = async function (req, res) {
    try {
        const { name, city, mobile, mediaUrl } = req.body

        let obj = {}

        if (!name)
            return res.status(400).send({ status: false, message: "name is required" });


        if (!isValidName(name.trim()))
            return res.status(400).send({ status: false, message: "name is not Valid or Empty" });

        obj.name = name

        if (!city)
            return res.status(400).send({ status: false, message: "city is required" });


        if (!isValidName(city.trim()))
            return res.status(400).send({ status: false, message: "city name is alpha Numeric" });

        let findcity = await cityModel.findOne({ city: city })


        if (!findcity) {
            return res.status(404).send({
                status: false, message: "Enter City is not found Enter valid city"
            })
        }

        obj.city = city

        if (!mobile)
            return res.status(400).send({ status: false, message: "mobile is required" });


        if (!isValidmobile(mobile))
            return res.status(400).send({ status: false, message: "mobile is not Valid or Empty" });

        const duplicatemobile = await userModel.findOne({ mobile: mobile });
        if (duplicatemobile)
            return res.status(400).send({ status: false, message: "This mobile number is Already Used !" })

        obj.mobile = mobile

        if (!mediaUrl) {
            return res.status(400).send({ status: false, message: "Enter MediaUrl" })
        }

        if (!validUrl(mediaUrl)) {
            return res.status(400).send({ status: false, message: "invalid long url" })
        }

        obj.mediaUrl = mediaUrl

        axios.request({
            method: 'get',
            url: 'https://api.binance.com/api/v1/time',
        })
            .then(response => {
                useData(response.data.serverTime)
            })
            .catch(error => {
                console.error(error);
            })

        async function useData(data) {
            obj.ID = data
            const userdata = await userModel.create(obj)
            return res.status(201).send({ status: true, data: userdata })
        }

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

////=====get user API==================>>>

const getUser = async function (req, res) {

    let findUser = await userModel.find()

    return res.status(200).send({ status: true, data: findUser })

}

//=====update City API==================>>>

const UpdateUser = async function (req, res) {

    try {
        let Id = req.params.Id

        let findUser = await userModel.findOne({ ID: Id })

        if (!findUser) {
            return res.status(401).send({ status: false, message: "User Not valid or Not Found" })
        }

        const { name, city, mobile, mediaUrl } = req.body
        let obj = {}


        // ---Name----
        if (name) {

            if (!isValidName(name.trim()))
                return res.status(400).send({ status: false, message: "name is not Valid or Empty" });

            obj.name = name
        }

        //---- City----
        if (city) {
            if (!isValidName(city.trim()))
                return res.status(400).send({ status: false, message: "city name is alpha Numeric" });

            let findcity = await cityModel.findOne({ city: city })


            if (!findcity) {
                return res.status(404).send({ status: false, message: "Enter City is not found Enter valid city" })
            }

            obj.city = city
        }

        // ---mobile----
        if (mobile) {

            if (!isValidmobile(mobile))
                return res.status(400).send({ status: false, message: "mobile is not Valid or Empty" });

            const duplicatemobile = await userModel.findOne({ mobile: mobile });

            if (duplicatemobile)
                return res.status(400).send({ status: false, message: "This mobile number is Already Used !" })

            obj.mobile = mobile
        }

        //---Media Url---
        if (mediaUrl) {
            if (!validUrl(mediaUrl)) {
                return res.status(400).send({ status: false, message: "invalid long url" })
            }

            obj.mediaUrl = mediaUrl
        }

        const userUpdate = await userModel.findOneAndUpdate({ ID: Id }, obj, { new: true })

        return res.status(200).send({ status: true, data: userUpdate })
    }

    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = { createUser, getUser, UpdateUser }