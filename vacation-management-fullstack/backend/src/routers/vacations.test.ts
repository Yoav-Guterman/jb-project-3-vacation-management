import { sign } from "jsonwebtoken"
import app, { start } from "../app"
import request from 'supertest'
import config from 'config'
import path from 'path';
import { v4 } from "uuid";

// import picture from '../test/assets/image/validPicture.webp'

const regularUser = {
    id: "c016829d-a157-4602-a018-c5bd3d3fa8e6",
    firstName: "yoav",
    lastName: "guterman",
    email: "yoavguterman@gmail.com",
    password: "d1b505f5228e233c20a0edd4b0b6bb2a9f668dfc5bc40023bfe6f4048ebfdd59",
    role: "user"
}

const adminUser = {
    id: "c016829d-a157-4602-a018-c5bd3d3fa8e6",
    firstName: "admin",
    lastName: "admin",
    email: "admin@gmail.com",
    password: "d1b505f5228e233c20a0edd4b0b6bb2a9f668dfc5bc40023bfe6f4048ebfdd59",
    role: "admin"
}

describe('vacation router tests', () => {

    // endpoint: /vacations/
    describe('GET /vacations/', () => {
        // test all the exceptions before...
        // get.server/vacations/
        test('it should return 401 if no authorization header', async () => {
            await start()
            const result = await request(app)
                .get('/vacations')
            expect(result.statusCode).toBe(401)
        })

        test('it should return an array of vacations', async () => {
            await start()
            const jwt = sign(regularUser, config.get<string>('app.jwtSecret'))

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
    describe('POST /vacations/ validation', () => {

        test('it should send vacation validation error if destination is less than 3 chars ', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');

            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Te')
                .field('description', 'This is a valid description that is long enough')
                .field('startDate', new Date(Date.now() + 86400000).toISOString())
                .field('endDate', new Date(Date.now() + 172800000).toISOString())
                .field('price', '500')
                .attach('vacationImage', testImagePath);


            expect(result.statusCode).toBe(422);
            expect(result.text).toBe('"destination" length must be at least 3 characters long')
        });
        test('it should send validation error if no destination field', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');

            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('description', 'This is a valid description that is long enough')
                .field('startDate', new Date(Date.now() + 86400000).toISOString())
                .field('endDate', new Date(Date.now() + 172800000).toISOString())
                .field('price', '500')
                .attach('vacationImage', testImagePath);

            expect(result.statusCode).toBe(422);
            expect(result.text).toBe('"destination" is required')
        });

        test('it should send validation error if description is less than 10 chars ', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');

            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Test destination')
                .field('description', 'short')
                .field('startDate', new Date(Date.now() + 86400000).toISOString())
                .field('endDate', new Date(Date.now() + 172800000).toISOString())
                .field('price', '500')
                .attach('vacationImage', testImagePath);


            expect(result.statusCode).toBe(422);
            expect(result.text).toBe('"description" length must be at least 10 characters long')
        });

        test('it should send validation error if no description field', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');

            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Test destination')
                .field('startDate', new Date(Date.now() + 86400000).toISOString())
                .field('endDate', new Date(Date.now() + 172800000).toISOString())
                .field('price', '500')
                .attach('vacationImage', testImagePath);


            expect(result.statusCode).toBe(422);
            expect(result.text).toBe('"description" is required')
        });

        test('it should send validation error if startDate is less than today ', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');

            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Test destination')
                .field('description', 'This is a valid description that is long enough')
                .field('startDate', new Date(Date.now() - 86400000).toISOString())
                .field('endDate', new Date(Date.now() + 172800000).toISOString())
                .field('price', '500')
                .attach('vacationImage', testImagePath);

            expect(result.statusCode).toBe(422);
            expect(result.text).toBe('Cannot select dates in the past')
        });

        test('it should send validation error if no startDate field', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');

            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Test destination')
                .field('description', 'This is a valid description that is long enough')
                .field('endDate', new Date(Date.now() + 172800000).toISOString())
                .field('price', '500')
                .attach('vacationImage', testImagePath);

            expect(result.statusCode).toBe(422);
            expect(result.text).toBe('"startDate" is required')
        });

        test('it should send validation error if no endDate field', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');

            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Test destination')
                .field('description', 'This is a valid description that is long enough')
                .field('startDate', new Date(Date.now() + 86400000).toISOString())
                .field('price', '500')
                .attach('vacationImage', testImagePath);

            expect(result.statusCode).toBe(422);
            expect(result.text).toBe('"endDate" is required')
        });

        test('it should send validation error if endDate is before startDate', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');

            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Test destination')
                .field('description', 'This is a valid description that is long enough')
                .field('startDate', new Date(Date.now() + 86400000).toISOString())
                .field('endDate', new Date(Date.now() - 172800000).toISOString())
                .field('price', '500')
                .attach('vacationImage', testImagePath);

            expect(result.statusCode).toBe(422);
            expect(result.text).toBe('End date must be after start date')
        });

        test('it should send validation error if price is less than 0', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');

            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Test destination')
                .field('description', 'This is a valid description that is long enough')
                .field('startDate', new Date(Date.now() + 86400000).toISOString())
                .field('endDate', new Date(Date.now() + 172800000).toISOString())
                .field('price', '-1')
                .attach('vacationImage', testImagePath);

            expect(result.statusCode).toBe(422);
            expect(result.text).toBe('"price" must be greater than or equal to 0')
        });

        test('it should send validation error if price is greater than 10000', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');

            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Test destination')
                .field('description', 'This is a valid description that is long enough')
                .field('startDate', new Date(Date.now() + 86400000).toISOString())
                .field('endDate', new Date(Date.now() + 172800000).toISOString())
                .field('price', '10001')
                .attach('vacationImage', testImagePath);

            expect(result.statusCode).toBe(422);
            expect(result.text).toBe('"price" must be less than or equal to 10000')
        });

        test('it should send validation error if no price field', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');

            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Test destination')
                .field('description', 'This is a valid description that is long enough')
                .field('startDate', new Date(Date.now() + 86400000).toISOString())
                .field('endDate', new Date(Date.now() + 172800000).toISOString())
                .attach('vacationImage', testImagePath);

            expect(result.statusCode).toBe(422);
            expect(result.text).toBe('"price" is required')
        });

        test('it should send validation error if no image field', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');

            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Test destination')
                .field('description', 'This is a valid description that is long enough')
                .field('startDate', new Date(Date.now() + 86400000).toISOString())
                .field('endDate', new Date(Date.now() + 172800000).toISOString())
                .field('price', '500')

            expect(result.statusCode).toBe(422);
            expect(result.text).toBe('"vacationImage" is required')
        });

        test('it should send validation error if image mimetype is invalid', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            const testImagePath = path.join(__dirname, '../test/assets/image/invalidPicture.avif');

            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Test destination')
                .field('description', 'This is a valid description that is long enough')
                .field('startDate', new Date(Date.now() + 86400000).toISOString())
                .field('endDate', new Date(Date.now() + 172800000).toISOString())
                .field('price', '500')
                .attach('vacationImage', testImagePath);

            console.log(`result: ${result.text}`)
            expect(result.statusCode).toBe(422);
            expect(result.text).toBe('"vacationImage.mimetype" must be one of [image/png, image/jpg, image/jpeg, image/webp]')
        });

        test('it should send validation error if regular user tries to upload', async () => {
            await start();
            const jwt = sign(regularUser, config.get<string>('app.jwtSecret'));

            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');

            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Test destination')
                .field('description', 'This is a valid description that is long enough')
                .field('startDate', new Date(Date.now() + 86400000).toISOString())
                .field('endDate', new Date(Date.now() + 172800000).toISOString())
                .field('price', '500')
                .attach('vacationImage', testImagePath);

            expect(result.statusCode).toBe(403);
            expect(result.text).toBe('you need to be "admin" for this action')
        });

        test('it should create a vacation with valid Bucket and mimetype', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            // Create a path to a test image file
            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');
            const bucketName = config.get<string>('s3.bucket')

            // When using file uploads, you must use field() for form data
            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Test Destination')
                .field('description', 'This is a valid description that is long enough')
                .field('startDate', new Date(Date.now() + 86400000).toISOString())
                .field('endDate', new Date(Date.now() + 172800000).toISOString())
                .field('price', '500')
                .attach('vacationImage', testImagePath);

            // just to see the pretty print of the result vacation
            console.log('Response body:', JSON.stringify(result.body, null, 2));
            expect(result.statusCode).toBe(200);
            expect(result.body).toHaveProperty('id');
            expect(result.body).toHaveProperty('imageUrl');
            expect(result.body.imageUrl).toContain(`${bucketName}`)
            expect(result.body.imageUrl).toContain(`.webp`)
        });
    })

    describe('DELETE /vacations/:id validation', () => {

        test('it should reject if ID is not a valid UUID', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            // Try to delete with an invalid ID
            const result = await request(app)
                .delete('/vacations/not-a-valid-uuid')
                .set({ 'Authorization': `Bearer ${jwt}` });

            expect(result.statusCode).toBe(422); // Unprocessable Entity for validation error
            expect(result.text).toBe('"id" must be a valid GUID')
        });

        test('it should reject if vacation does not exist', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            // Generate a random UUID that almost certainly doesn't exist
            const nonExistentId = v4()

            const result = await request(app)
                .delete(`/vacations/${nonExistentId}`)
                .set({ 'Authorization': `Bearer ${jwt}` });

            expect(result.statusCode).toBe(404);
            expect(result.text).toBe('the vacation you were trying to delete does not exist')
        });

        test('it should forbid a regular user to delete vacation', async () => {
            await start();
            const jwt = sign(regularUser, config.get<string>('app.jwtSecret'));

            // Generate a random UUID that almost certainly doesn't exist
            const randomId = v4()

            const result = await request(app)
                .delete(`/vacations/${randomId}`)
                .set({ 'Authorization': `Bearer ${jwt}` });

            expect(result.statusCode).toBe(403);
            expect(result.text).toBe('you need to be "admin" for this action')
        });

        test('it should successfully delete an existing vacation', async () => {
            await start();
            const jwt = sign(adminUser, config.get<string>('app.jwtSecret'));

            // First, create a vacation to delete
            const testImagePath = path.join(__dirname, '../test/assets/image/validPicture.webp');

            // Create a vacation
            const createResult = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
                .field('destination', 'Test Destination to be deleted')
                .field('description', 'This is a valid description that is long enough')
                .field('startDate', new Date(Date.now() + 86400000).toISOString())
                .field('endDate', new Date(Date.now() + 172800000).toISOString())
                .field('price', '500')
                .attach('vacationImage', testImagePath);

            console.log('new vacation body:', JSON.stringify(createResult.body, null, 2));
            expect(createResult.statusCode).toBe(200);
            expect(createResult.body).toHaveProperty('id');

            // Now delete it
            const vacationId = createResult.body.id;
            const deleteResult = await request(app)
                .delete(`/vacations/${vacationId}`)
                .set({ 'Authorization': `Bearer ${jwt}` });

            console.log('delete success:', JSON.stringify(deleteResult.body, null, 2));
            expect(deleteResult.statusCode).toBe(200);
            expect(deleteResult.body).toHaveProperty('success', true);
        });
    })

})