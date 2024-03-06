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



const getPreview = async () => {
  await minioClient.fGetObject('test', '1709016184259.mp4', 'temp/1709016184259.mp4', (err) => {
    if(err) {
      return console.log(err);
    }
    console.log('success');
  })
  ffmpeg('temp/1709016184259.mp4').frames(1).videoFilters("select='not(mod(n\,100))'", 'scale=320:180', 'tile=10X10').output("thumbnail7.jpg").on('end', () => {
    fs.unlink('temp/1709016184259.mp4', () => {
      console.log('删除成功');
    })
  }).run()
}

getPreview()