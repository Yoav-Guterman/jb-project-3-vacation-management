import { sign } from "jsonwebtoken"
import app, { start } from "../app"
import request from 'supertest'
import config from 'config'
const user = {
    id: "c016829d-a157-4602-a018-c5bd3d3fa8e6",
    firstName: "yoav",
    lastName: "guterman",
    email: "yoavguterman@gmail.com",
    password: "d1b505f5228e233c20a0edd4b0b6bb2a9f668dfc5bc40023bfe6f4048ebfdd59",
    role: "user"
}

describe('vacation router tests', () => {
    describe('/ endpoint test', () => {
        // test all the exceptions before...
        test('it should return 401 if no authorization header', async () => {
            await start()
            const result = await request(app).get('/vacations')
            expect(result.statusCode).toBe(401)
        })
        test('it should return an array of vacations', async () => {
            await start()
            const jwt = sign(user, config.get<string>('app.jwtSecret'))

            const result = await request(app)
                .get('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
            expect(result.statusCode).toBe(200)
            expect(Array.isArray(result.body)).toBeTruthy()
            expect(result.body[0]).toHaveProperty('id')
            expect(result.body[0]).toHaveProperty('destination')
            expect(result.body[0]).toHaveProperty('description')
            expect(result.body[0]).toHaveProperty('startDate')
            expect(result.body[0]).toHaveProperty('endDate')
            expect(result.body[0]).toHaveProperty('price')
            expect(result.body[0]).toHaveProperty('imageUrl')
            expect(result.body[0]).toHaveProperty('followers')

        })
    })
})