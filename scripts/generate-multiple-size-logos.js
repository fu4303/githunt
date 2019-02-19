const { exec } = require('child_process');
const sharp = require('sharp');

var inPic = 'design/logo-top-star.ink.svg';
var outDir = 'public/img';
var sizes = [128, 48, 16];

var trans = sharp(inPic);
var fs = sizes.map(size => {
    let destPath = `${outDir}/icon${size}.png`
    return trans
        .resize(size, size)
        .toFile(destPath)
        .then(() => {
            console.info(`generated a copy of ${size}x${size}: ${destPath}`);
        })
});

Promise.all(fs).then(() => {
    console.info('multiple-sizes completed');
})

var optSVGCommand = `svgo --pretty --indent=2 -i ${inPic} -o ${outDir}/logo.svg`;
exec(optSVGCommand, (error, stdout, stderr) => {
    console.log(optSVGCommand);

    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.info(`done optimized svg logo: ${stdout}`)
    if (stderr) {
        console.error(`stderr: ${stderr}`);
    }
})
