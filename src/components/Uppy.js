const Uppy = require('uppy/lib/core')
const AwsS3 = require('uppy/lib/plugins/AwsS3')
const DragDrop = require('uppy/lib/react/DragDrop')
import React from 'react';
const uppy = Uppy({
  meta: {},
  restrictions: { maxNumberOfFiles: 1 },
  autoProceed: true
})
uppy.use(AwsS3, { host: 'https://s3.eu-west-3.amazonaws.com/fitnetbucket' }) 
uppy.on('complete', (result) => {
  const url = result.successful[0].uploadURL
  console.log("JA SAM RESULT ",result);
  store.dispatch({
    type: SET_USER_AVATAR_URL,
    payload: { url: url }
  })
})

const AvatarPicker = () => {
  return (
    <div>
      <img src={{uri: 'https://scontent-sof1-1.xx.fbcdn.net/v/t1.0-9/26734393_1950345304989774_4599614106228655314_n.jpg?oh=b9ec716dc3e9ba294f9b6ba1180677b8&oe=5AF18C78'}}
      alt="Current Avatar" />
      <DragDrop
        uppy={uppy}
        locale={{
          strings: {
            chooseFile: 'Pick a new avatar'
          }
        }}
      />
    </div>
  )
}
export default AvatarPicker;
