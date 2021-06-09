const DButils = require('../routes/utils/DButils')
const server_utils = require('../routes/utils/server_utils')
jest.setTimeout(100000)

global.beforeAll(async() => {
    server_utils.openServer()
    await DButils.connectDB()
})

global.afterAll(async() => {
    server_utils.closeServer()
    await DButils.disconnectDB()
})