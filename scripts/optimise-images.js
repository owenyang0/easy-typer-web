/**
 * This script should be executed by `lint-staged` before commiting
 * Therefore script assumes that file path exists in `process.argv`
 */

const path = require("path")
const fs = require("fs")
const imagemin = require("imagemin")
const imageminGifsicle = require("imagemin-gifsicle")
const imageminSvgo = require("imagemin-svgo")
const sharp = require("sharp")

const filePath = process.argv[2]
const src = "static/img"
const dist = src
const log = (msg) => process.stdout.write(msg)

const optimiseWithSharp = async (file, ext) => {
  log(`Optimising ${file} with \`sharp()\`... `)

  // `sharp` cannot overwrite the original file, so we need to create a temporary one
  const tmpFilePath = `${file}.tmp`

  await sharp(file)
    .resize({
      height: 1440,
      fit: sharp.fit.inside,
      width: 1920,
      withoutEnlargement: true,
    })
    .toFormat(ext === "jpg" ? "jpeg" : ext, {
      progressive: true,
      quality: 75,
    })
    .toFile(tmpFilePath)
    .then(() => {
      log("OK!\n")

      // Move the temporary file to the original file path
      fs.renameSync(tmpFilePath, file)
    })
    .catch((err) => {
      log("ERROR!\n")
      console.error(err)
    })
}

const optimiseWithImagemin = async (file) => {
  log(`Optimising ${file} with \`imagemin()\`... `)

  imagemin([file], {
    plugins: [
      imageminGifsicle({
        interlaced: true,
        optimizationLevel: 2,
      }),
      imageminSvgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false },
          { removeUnknownsAndDefaults: false },
          { convertShapeToPath: false },
          { inlineStyles: false },
        ],
      }),
    ],
  }).then((files) =>
    files.forEach(async (file) => {
      let { dir, name, ext } = path.parse(file.sourcePath)
      log("OK!\n")
      file.destinationPath = `${dir.replace(src, dist)}/${name}${ext}`
      fs.mkdirSync(path.dirname(file.destinationPath), { recursive: true })
      fs.writeFileSync(file.destinationPath, file.data)
    }),
  )
}

const optimiseImages = async () => {
  const fileExtension = path.extname(filePath).toLowerCase().replace(".", "")

  if (["jpg", "jpeg", "png"].includes(fileExtension)) {
    await optimiseWithSharp(filePath, fileExtension)
  } else {
    await optimiseWithImagemin(filePath)
  }
}

optimiseImages()
