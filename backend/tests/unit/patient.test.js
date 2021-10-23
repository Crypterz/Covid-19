const patientController= require('../../controllers/patientController')
const Patient = require('../../models/patientModel')
const httpMocks = require('node-mocks-http')

Patient.create = jest.fn()

describe("patientController",()=>{
    it("should have a createPatient function",()=>{
        expect(typeof patientController.createPatient).toBe("function")
    })
    it("should call Patient.create",()=>{
        let req, res, next
        req=httpMocks.createRequest
        res=httpMocks.createResponse
        next = null
        patientController.createPatient(req,res,next)
        expect(Patient.create()).toBeCalled()
    })
})
