"use strict"

const { getKittens, getKitten } = require("../../../src/kittenAPI")
const availableKittens = require("../../../src/kittenData.js")


describe("Clients Service", () => {
    const GET_EXPECTED_BODY = availableKittens

    afterEach(() => provider.verify())

    describe("GET Kittens", () => {
        beforeEach(() => {
            const interaction = {
                state: "i have a list of kittens",
                uponReceiving: "get all available kittens",
                withRequest: {
                    method: "GET",
                    path: "/kittens",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: GET_EXPECTED_BODY,
                },
            }
            return provider.addInteraction(interaction)
        })

        test("getKittens() returns expected body, header and statusCode", async() => {
            const response = await getKittens()
            expect(response.headers['content-type']).toBe("application/json; charset=utf-8")
            expect(response.data).toEqual(GET_EXPECTED_BODY)
            expect(response.status).toEqual(200)
        })
    })

    describe("GET Single kitten", () => {
        const kittenID = 1
        const GET_EXPECTED_BODY = [{
            id: 1,
            name: 'Zepsuszek',
            furColor: 'black and white'
          }]

          beforeEach(() => {
            const interaction = {
                state: "i have a list of kittens",
                uponReceiving: "get kitten with specific id",
                withRequest: {
                    method: "GET",
                    path: `/kittens/${kittenID}`,
                    headers: {
                        Accept: "application/json, text/plain, */*",
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: GET_EXPECTED_BODY,
                },
            }
            return provider.addInteraction(interaction)
        })

        test("getKitten() returns expected body, header and statusCode", async() => {
            const response = await getKitten(kittenID)
            expect(response.headers['content-type']).toBe("application/json; charset=utf-8")
            expect(response.data).toEqual(GET_EXPECTED_BODY)
            expect(response.status).toEqual(200)
        })
    })
})
