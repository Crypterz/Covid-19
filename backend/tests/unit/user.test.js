const UserController =require("../../controllers/userController");
describe("User Controller - updateUserInformation",()=>{
    it("shoud have a updateUserInformation function",()=>{
        expect(typeof UserController.updateUserInformation).toBe("funct")
    })
})