// worked out coordinates using svgs from https://thenounproject.com/icon/capricorn-constellation-5421417/
const constellations = [
    {
        name: "Cancer",
        x: 100,
        y: 100,
        rotation: 0,
        scale: 1,
        stars: [
            { x: 21, y: 47, size: 4 },
            { x: 20, y: 5, size: 3 },
            { x: 23, y: 33, size: 3 },
            { x: 49, y: 81, size: 3 },
            { x: 8, y: 71, size: 3 }
        ]
    },
    { // done
        name: "Gemini",
        x: 250,
        y: 100,
        rotation: 0,
        scale: 2,
        stars: [
            { x: 8, y: 13, size: 4 },
            { x: 20, y: 38, size: 4 },
            { x: 20, y: 4, size: 4 },
            { x: 34, y: 13, size: 4 },
            { x: 49, y: 34, size: 4 },
            { x: 50, y: 5, size: 4 },
            { x: 57, y: 53, size: 4 },

            { x: 5, y: 25, size: 3 },
            { x: 14, y: 20, size: 3 },
            { x: 17, y: 56, size: 3 },
            { x: 22, y: 18, size: 3 },
            { x: 32, y: 45, size: 3 },
            { x: 40, y: 74, size: 3 },
            { x: 48, y: 62, size: 4 },
            { x: 63, y: 46, size: 3 },
            { x: 70, y: 46, size: 3 }
        ]
    },
    {
        name: "Taurus",
        x: 400,
        y: 100,
        rotation: 0,
        scale: 1,
        stars: [
            { x: 40, y: 41, size: 4 },
            { x: 14, y: 8, size: 4 },
            { x: 41, y: 24, size: 4 },
            { x: 5, y: 28, size: 3 },
            { x: 48, y: 34, size: 3 },
            { x: 50, y: 45, size: 3 },
            { x: 54, y: 40, size: 3 },
            { x: 56, y: 45, size: 3 },
            { x: 59, y: 64, size: 3 },
            { x: 65, y: 72, size: 3 },
            { x: 69, y: 54, size: 4 },
            { x: 89, y: 52, size: 3 },
            { x: 92, y: 60, size: 3 },
            { x: 95, y: 64, size: 3 }
        ]
    },
    {
        name: "Capricorn",
        x: 550,
        y: 100,
        rotation: 0,
        scale: 1,
        stars: [
            { x: 9, y: 21, size: 4 },
            { x: 51, y: 30, size: 3 },
            { x: 62, y: 51, size: 3 },
            { x: 30, y: 22, size: 3 },
            { x: 84, y: 9, size: 3 },
            { x: 57, y: 58, size: 4 },
            { x: 89, y: 6, size: 4 },
            { x: 45, y: 22, size: 3 },
            { x: 16, y: 22, size: 3 },
            { x: 28, y: 43, size: 3 },
            { x: 84, y: 16, size: 3 }
        ]
    },
    {
        name: "Big Dipper",
        x: 700,
        y: 100,
        rotation: 0,
        scale: 1,
        stars: [
            { x: 14, y: 10, size: 3 },
            { x: 42, y: 17, size: 4 },
            { x: 51, y: 32, size: 3 },
            { x: 59, y: 60, size: 3 },
            { x: 66, y: 44, size: 3 },
            { x: 82, y: 72, size: 4 },
            { x: 97, y: 57, size: 4 }
        ]
    },
    {
        name: "Little Dipper",
        x: 760,
        y: 30,
        rotation: 0,
        scale: 0.25,
        stars: [
            { x: 249, y: 194, size: 4 },
            { x: 185, y: 86, size: 3 },
            { x: 116, y: 66, size: 3 },
            { x: 40, y: 69, size: 3 },
            { x: 119, y: 17, size: 3 },
            { x: 17, y: 22, size: 3 },
            { x: 227, y: 129, size: 3 }
        ]
    }
];