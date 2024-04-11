const { log } = require('console')
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const path = require('path')
const { getVideoTime } = require('./utils/getVideoInfo')
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

// ffmpeg.ffprobe('test.mp4', (err, metadata) => {
//   const { avg_frame_rate } = metadata.streams[0]
//   console.log(avg_frame_rate);
//   console.log(metadata);
// })

const getVideoMetaData = async (filename) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filename, (err, metadata) => {
      if(err) {
        reject(new Error(err))
      }else {
        resolve(metadata)
      }
    })
  })
}

// const getVideoThumbPics = async (filename, timeStep) => {
//   const metadata = await getVideoMetaData(filename)
//   const { r_frame_rate, nb_frames } = metadata.streams[0]
//   const fps = Number(r_frame_rate.slice(0, 2))
//   let picNum = nb_frames / (fps * timeStep * 100)
//   if(picNum != Math.floor(picNum)) {
//     picNum += 1
//   }
//   for(let i = 0; i < picNum; i++) {
//     ffmpeg(filename)
//     .frames(1)
//     .videoFilters(`select='gte(n\, ${i * fps * timeStep * 100})'`, `select='not(mod(n\,${fps * timeStep}))'`, 'scale=320:180', 'tile=10X10')
//     .output(`${filename.split('.')[0]}-${i}.jpg`)
//     .run()
//   }
// }

// getVideoThumbPics('spider.mp4', 4)

// ffmpeg('test.mp4')
// .frames(1)
// .videoFilters("select='gte(n\, 0)'", "select='not(mod(n\,240))'", 'scale=320:180', 'tile=10X10')
// .output(`test11.jpg`)
// .run()

// ffmpeg('test.mp4')
// .frames(1)
// .videoFilters("select='gte(n\, 24000)'", "select='not(mod(n\,240))'", 'scale=320:180', 'tile=10X10')
// .output(`test22.jpg`)
// .run()

// ffmpeg('test.mp4')
// .frames(1)
// .videoFilters("select='gte(n\, 36000)'", "select='not(mod(n\,240))'", 'scale=320:180', 'tile=10X10')
// .output(`test33.jpg`)
// .run()

// ffmpeg('test.mp4')
// .frames(1)
// .videoFilters("select='gte(n\, 72000)'", "select='not(mod(n\,240))'", 'scale=320:180', 'tile=10X10')
// .output(`test44.jpg`)
// .run()
// ffmpeg.ffprobe('deadpool.mp4', (err, metadata) => {
//   const { avg_frame_rate } = metadata.streams[0]
//   console.log(avg_frame_rate);
// })


// fs.readdir('carrierInstructions', (err, files) => {
//   for(let i = 0; i < files.length; i++) {
//     ffmpeg(`carrierInstructions/image (${i}).png`).output(`carrierInstructions/${i + 1}.jpg`).run()
//   }
// })

// const dirs = ['operatingInstructions']
// const transformDirPic = async(dirs) => {
//   for(let i = 0; i < dirs.length; i++) {
//     const files = fs.readdirSync(dirs[i])
//     // 如果文件夹不存在就创建
//     if(!fs.existsSync(`${dirs[i]}/${dirs[i]}`)) {
//       fs.mkdirSync(`${dirs[i]}/${dirs[i]}`)
//     }
//     for(let j = 0; j < files.length; j++) {
//       console.log(files[j]);
//       ffmpeg(`${dirs[i]}/${files[j]}`).output(`${dirs[i]}/${dirs[i]}/${j}.jpg`).run()
//     }
//   }
// }
// transformDirPic(dirs)


const fileRead = async() => {
  const dirPath = 'F:/DownKyi-1.6.1/Media'
  const files = fs.readdirSync(dirPath)
  const videoPromiseList = []
  let duration = 0
  for(let i = 0; i < files.length; i++) {
    const firstDir = fs.readdirSync(path.resolve(dirPath, files[i]))
    firstDir.filter(item => item.lastIndexOf('mp4') > 0).forEach(filePath => {
      videoPromiseList.push(getVideoMetaData(path.resolve(dirPath, files[i], filePath)))
    })
  }
  Promise.all(videoPromiseList).then(resList => {
    resList.forEach(({streams}) => {
      duration += streams[0].duration
    })
    console.log(getVideoTime(duration));
  })
}

fileRead()
