// worked out coordinates using svgs from https://thenounproject.com/icon/capricorn-constellation-5421417/
const constellations = [
    {
        name: "Cancer",
        x: 1320,
        y: 2230,
        rotation: -40,
        scale: 5,
        stars: [
            { x: 21, y: 47, size: 3 },
            { x: 20, y: 5, size: 2 },
            { x: 23, y: 33, size: 2 },
            { x: 49, y: 81, size: 2 },
            { x: 8, y: 71, size: 2 }
        ]
    },
    { // done
        name: "Gemini",
        x: 1850,
        y: 1880,
        rotation: -75,
        scale: 8,
        stars: [
            { x: 8, y: 13, size: 3 },
            { x: 20, y: 38, size: 3 },
            { x: 20, y: 4, size: 3 },
            { x: 34, y: 13, size: 3 },
            { x: 49, y: 34, size: 3 },
            { x: 50, y: 5, size: 3 },
            { x: 57, y: 53, size: 3 },

            { x: 5, y: 25, size: 2 },
            { x: 14, y: 20, size: 2 },
            { x: 17, y: 56, size: 2 },
            { x: 22, y: 18, size: 2 },
            { x: 32, y: 45, size: 2 },
            { x: 40, y: 74, size: 2 },
            { x: 48, y: 62, size: 3 },
            { x: 63, y: 46, size: 2 },
            { x: 70, y: 46, size: 2 }
        ]
    },
    {
        name: "Taurus",
        x: 1650,
        y: 490,
        rotation: 210,
        scale: 7,
        stars: [
            { x: 40, y: 41, size: 3 },
            { x: 14, y: 8, size: 3 },
            { x: 41, y: 24, size: 3 },
            { x: 5, y: 28, size: 2 },
            { x: 48, y: 34, size: 2 },
            { x: 50, y: 45, size: 2 },
            { x: 54, y: 40, size: 2 },
            { x: 56, y: 45, size: 2 },
            { x: 59, y: 64, size: 2 },
            { x: 65, y: 72, size: 2 },
            { x: 69, y: 54, size: 3 },
            { x: 89, y: 52, size: 2 },
            { x: 92, y: 60, size: 2 },
            { x: 95, y: 64, size: 2 }
        ]
    },
    {
        name: "Capricorn",
        x: 2630 - 150,
        y: 1270,
        rotation: -90,
        scale: 7,
        stars: [
            { x: 9, y: 21, size: 3 },
            { x: 51, y: 30, size: 2 },
            { x: 62, y: 51, size: 2 },
            { x: 30, y: 22, size: 2 },
            { x: 84, y: 9, size: 2 },
            { x: 57, y: 58, size: 3 },
            { x: 89, y: 6, size: 3 },
            { x: 45, y: 22, size: 2 },
            { x: 16, y: 22, size: 2 },
            { x: 28, y: 43, size: 2 },
            { x: 84, y: 16, size: 2 }
        ]
    },
    {
        name: "Big Dipper",
        x: 540,
        y: 650,
        rotation: 110,
        scale: 5.4,
        stars: [
            { x: 14, y: 10, size: 2 },
            { x: 42, y: 17, size: 3 },
            { x: 51, y: 32, size: 2 },
            { x: 59, y: 60, size: 2 },
            { x: 66, y: 44, size: 2 },
            { x: 82, y: 72, size: 3 },
            { x: 97, y: 57, size: 3 }
        ]
    },
    {
        name: "Little Dipper",
        x: 750,
        y: 1180,
        rotation: 95,
        scale: 1.3,
        stars: [
            { x: 249, y: 194, size: 3 },
            { x: 185, y: 86, size: 2 },
            { x: 116, y: 66, size: 2 },
            { x: 40, y: 69, size: 2 },
            { x: 119, y: 17, size: 2 },
            { x: 17, y: 22, size: 2 },
            { x: 227, y: 129, size: 2 }
        ]
    },
    {
        name: "Meteor 1",
        x: 730,
        y: 2000,
        rotation: 80,
        scale: 3,
        stars: generateMeteor()
    },
    {
        name: "Meteor 2",
        x: 2400,
        y: 200,
        rotation: 40,
        scale: 4,
        stars: generateMeteor()
    },
    {
        name: "Meteor 3",
        x: 2760 - 125,
        y: 2000,
        rotation: -45,
        scale: 3,
        stars: generateMeteor()
    }
];

function generateMeteor () {
    const stars = []
    for (let i = 0; i < 20; i++) {
        stars.push({ x: 5 * i, y: 0, size: 4 })
    }
    return stars
}