const workboxBuild = require("workbox-build");
const buildSW = () => {
    return workboxBuild.injectManifest({
        swSrc: "src/sw-custom.js",
        swDest: "build/sw.js",
        globDirectory: "build",
        globPatterns: ["**/*.{js,css,html,png,svg}"],
    })
        .then(({ count, size, warnings }) => {
            warnings.forEach(console.warn);
            console.info(`${count} files will be precached, 
                  totaling ${size / (1024 * 1024)} MBs.`);
        });
};
buildSW();