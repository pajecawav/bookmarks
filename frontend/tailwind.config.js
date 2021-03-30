const colors = require("tailwindcss/colors");

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class",
    theme: {
        extend: {
            minWidth: {
                0: "0",
                "1/4": "25%",
                "1/2": "50%",
                "3/4": "75%",
                full: "100%",
            },
            colors: {
                cyan: colors.cyan,
                teal: colors.teal,
                blueGray: colors.blueGray,
                trueGray: colors.trueGray,
            },
            fill: {
                black: colors.black,
                blue: colors.blue,
                trueGray: colors.trueGray,
                white: colors.white,
            },
            stroke: {
                blue: colors.blue,
            },
        },
    },
    variants: {
        extend: {
            fill: ["hover", "focus", "group-hover", "dark"],
            stroke: ["hover", "focus", "group-hover"],
        },
    },
    plugins: [],
};
