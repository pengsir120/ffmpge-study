const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
// const minioClient = require('./minio')

// ffmpeg -y -i "test.mp4" -frames 1 -vf "select=not(mod(n\,100)),scale=320:180,tile=10X10" "thumbnail.jpg"
// ffmpeg -y -i "test.mp4" -frames 1 -vf "thumbnail=n=100,scale=320:180,tile=10X10" thumbnail.jpg

// const ffmpegSync = async (filename) => {
//   return new Promise((resolve, reject) => {
//     ffmpeg(`temp/${filename}.mp4`)
//     .frames(1)
//     .videoFilters("select='not(mod(n\,100))'", 'scale=320:180', 'tile=10X10')
//     .output(`temp/${filename}.jpg`)
//     .on("end", () => {
//       resolve()
//     })
//     .on('error', (err) => {
//       return reject(new Error(err))
//     })
//     .run()
//   })
// }

// const getPreview = async () => {
//   const filename = '1709710284055'
//   await minioClient.fGetObject('test', `${filename}.mp4`, `temp/${filename}.mp4`)
//   await ffmpegSync(filename)
//   await fs.unlinkSync(`temp/${filename}.mp4`)
// }

// getPreview()

ffmpeg.ffprobe('deadpool.mp4', (err, metadata) => {
  const { avg_frame_rate } = metadata.streams[0]
  console.log(avg_frame_rate);
})