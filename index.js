const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const path = require('path')
const minioClient = require('./minio')

// ffmpeg('./test.mp4')
//   .thumbnails({
//     folder: './screenshot',
//     count: 4,
// });

// ffmpeg('./screenshot/tn_1.png').input('./screenshot/tn_2.png').input('./screenshot/tn_3.png').input('./screenshot/tn_4.png').complexFilter([
//   {
//     filter: 'vstack',
//     options: '4',
//   }
// ]).output('output.jpg').run()

// ffmpeg -i a.jpg -i b.jpg -filter_complex hstack output.jpg
// ffmpeg -i tn_1.png -i tn_2.png -i tn_3.png -i tn_4.png -filter_complex "[0][1][2][3]hstack=inputs=4" output.jpg

// ffmpeg -y -i "test.mp4" -frames 1 -vf "select=not(mod(n\,100)),scale=320:180,tile=10X10" "thumbnail.jpg"
// ffmpeg -y -i "test.mp4" -frames 1 -vf "thumbnail=n=100,scale=320:180,tile=10X10" thumbnail.jpg


// ffmpeg(fs.createReadStream(path.resolve("./test.mp4"))).frames(1).videoFilters("select='not(mod(n\,100))'", 'scale=320:180', 'tile=10X10').output("thumbnail7.jpg").run();

const ffmpegSync = async (filename) => {
  return new Promise((resolve, reject) => {
    ffmpeg(`temp/${filename}.mp4`)
    .frames(1)
    .videoFilters("select='not(mod(n\,100))'", 'scale=320:180', 'tile=10X10')
    .output(`temp/${filename}.jpg`)
    .on("end", () => {
      resolve()
    })
    .on('error', (err) => {
      return reject(new Error(err))
    })
    .run()
  })
  
}


const getPreview = async () => {
  const filename = '1709710284055'
  await minioClient.fGetObject('test', `${filename}.mp4`, `temp/${filename}.mp4`)
  await ffmpegSync(filename)
  await fs.unlinkSync(`temp/${filename}.mp4`)
}


getPreview()