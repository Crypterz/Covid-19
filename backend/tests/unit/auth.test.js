const authController= require('../../controllers/authController')
const userModel = require('../../models/userModel')
const httpMocks=require("node-mocks-http")
const patient = require("../mock-data/patient.json")
userModel.create = jest.fn()

describe("AuthController",()=>{
    it("should have a signToken function",()=>{
        expect(typeof authController.signup).toBe("function")
    })
    it("should call userModel.create",()=>{
        let req, res;
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = null;
        req.body=patient;
        authController.signup(req,res,next);
        expect(userModel.create).toBeCalled();
    })
})