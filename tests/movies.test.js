import { describe, test, expect, assert } from 'vitest'

describe('the movies endpoint', () => {
    test('returns 200', async () => {
        const response = await fetch('http://localhost:3000/api/movies')
        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data).toHaveLength(5)
    })
    describe('filtering results', () => {
        test('filtering by a range', async () => {
            const response = await fetch('http://localhost:3000/api/movies?imdb.rating_range=7.5,8')
            expect(response.status).toBe(200)
            const data = await response.json()
            expect(data).toHaveLength(1)
        })
        test('filtering by multiple ranges', async () => {
            const response = await fetch('http://localhost:3000/api/movies?imdb.rating_range=7.5,8&runtime_range=149,150')
            expect(response.status).toBe(200)
            const data = await response.json()
            expect(data).toHaveLength(1)
        })
        test('filtering by a checkbox value', async () => {
            const response = await fetch('http://localhost:3000/api/movies?genres=Biography,History')
            expect(response.status).toBe(200)
            const data = await response.json()
            assert(data.every(movie => ["In the Land of the Head Hunters", 'Salomè'].includes(movie.title)))
        })
    })
    describe('sorting results', () => {
        test('sorting by runtime ascending', async () => {
            const response = await fetch('http://localhost:3000/api/movies?sortBy=runtime&sortOrder=1')
            expect(response.status).toBe(200)
            const data = await response.json()
            expect(data[0].title).toBe('In the Land of the Head Hunters')
        })
        test('sorting by runtime descending', async () => {
            const response = await fetch('http://localhost:3000/api/movies?sortBy=runtime&sortOrder=-1')
            expect(response.status).toBe(200)
            const data = await response.json()
            expect(data[0].title).toBe('The Four Horsemen of the Apocalypse')
        })
    })
})