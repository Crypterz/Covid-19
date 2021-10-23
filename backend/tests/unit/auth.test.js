const authController= require('../../controllers/authController')

const patientModel = require('../../models/patientModel')

patientModel.create = jest.fn()

describe("AuthController",()=>{
    it("should have a signToken function",()=>{
        expect(typeof authController.signup).toBe("function")
    })
})