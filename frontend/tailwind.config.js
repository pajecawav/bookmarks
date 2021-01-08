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
            fill: (theme) => ({
                black: theme("colors.black"),
                blue: theme("colors.blue.200"),
            }),
            stroke: (theme) => ({
                blue: theme("colors.blue.500"),
            }),
        },
    },
    variants: {
        extend: {
            fill: ["hover", "focus", "group-hover"],
            stroke: ["hover", "focus", "group-hover"],
        },
    },
    plugins: [],
};
