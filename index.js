const ffmpeg = require('fluent-ffmpeg')

// ffmpeg('./test.mp4')
//   .thumbnails({
//     folder: './screenshot',
//     count: 4,
// });

ffmpeg('./screenshot/tn_1.png').input('./screenshot/tn_2.png').complexFilter([
  {
    filter: 'hstack',
    inputs: ['./screenshot/tn_1.png', './screenshot/tn_2.png'],
    outputs: './screenshot/output.png'
  }
])

// ffmpeg -i a.jpg -i b.jpg -filter_complex hstack output.jpg
// ffmpeg -i tn_1.png -i tn_2.png -i tn_3.png -i tn_4.png -filter_complex "[0][1][2][3]hstack=inputs=4" output.jpg

