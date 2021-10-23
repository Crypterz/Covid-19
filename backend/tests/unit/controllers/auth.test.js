const authController= require('../../../controllers/authController')

describe("AuthController",()=>{
    it("should have a signToken function",()=>{
        expect(typeof authController.signup).toBe("function")
    })
})