const authController= require('../../controllers/authController')
const userModel = require('../../models/userModel')
const httpMocks=require("node-mocks-http")
const patient = require("../mock-data/patient.json")
userModel.create = jest.fn()

let req, res, next;
beforeEach(()=>{ 
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});
describe("AuthController",()=>{
    beforeEach(()=>{ 
        req.body=patient;
    })
    it("should have a signToken function",()=>{
        expect(typeof authController.signup).toBe("function")
    })
    it("should call userModel.create",()=>{
        authController.signup(req,res,next);
        expect(userModel.create).toBeCalled();
    })
    it("should return 200 response Code",()=>{
        authController.signup(req,res,next);
        expect(res.statusCode).toBe(200);
        // expect(res._isEndCalled()).toBeTruthy();
    })
})
