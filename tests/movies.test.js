import { describe, test, expect, assert } from 'vitest'

describe('the movies endpoint', () => {
    test('returns 200', async () => {
        const response = await fetch('http://localhost:3000/api/movies')
        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data[0].movies).toHaveLength(5)
        expect(data[0].info.totalPages).toBe(1)
    })
    describe('filtering results', () => {
        test('filtering by a range', async () => {
            const response = await fetch('http://localhost:3000/api/movies?imdb.rating=7.5,8')
            expect(response.status).toBe(200)
            const data = await response.json()
            expect(data[0].movies).toHaveLength(1)
        })
        test('filtering by multiple ranges', async () => {
            const response = await fetch('http://localhost:3000/api/movies?imdb.rating=7.5,8&runtime=149,150')
            expect(response.status).toBe(200)
            const data = await response.json()
            expect(data).toHaveLength(1)
        })
        test('filtering by a checkbox value', async () => {
            const response = await fetch('http://localhost:3000/api/movies?genres=Biography,History')
            expect(response.status).toBe(200)
            const data = await response.json()
            assert(data[0].movies.every(movie => ["In the Land of the Head Hunters", 'Salomè'].includes(movie.title)))
        })
    })
    describe('sorting results', () => {
        test('sorting by runtime ascending', async () => {
            const response = await fetch('http://localhost:3000/api/movies?sortBy=runtime&sortOrder=1')
            expect(response.status).toBe(200)
            const data = await response.json()
            expect(data[0].movies[0].title).toBe('In the Land of the Head Hunters')
        })
        test('sorting by runtime descending', async () => {
            const response = await fetch('http://localhost:3000/api/movies?sortBy=runtime&sortOrder=-1')
            expect(response.status).toBe(200)
            const data = await response.json()
            expect(data[0].movies[0].title).toBe('The Four Horsemen of the Apocalypse')
        })
    })
    describe('with invalid requests', () => {
        test('it doesnt apply filters on unallowed fields', async () => {
            const response = await fetch('http://localhost:3000/api/movies?awards.nominations=2,10')
            expect(response.status).toBe(200)
            const data = await response.json()
            expect(data[0].movies).toHaveLength(5)
        })
        test('sorting by an unallowed field defaults to the imdb.rating', async () => {
            const expectedResponse = await fetch('http://localhost:3000/api/movies')
            expect(expectedResponse.status).toBe(200)
            const response = await fetch('http://localhost:3000/api/movies?sortBy=imdb.id&sortOrder=-1')
            expect(response.status).toBe(200)
            expect(response.json()).toStrictEqual(expectedResponse.json())

        })
    })
})