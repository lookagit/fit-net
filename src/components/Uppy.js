
import React from 'react';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
import Compress from 'compress.js';

const compress = new Compress();
export default class S3Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prev: null,
      image: 'http://res.cloudinary.com/drama/image/upload/v1526508620/smiljkoHolder_ovuulk.png',
      imageSet: false,
    };
  }

  onDrop = async files => {
    const compressedFile = await compress.compress(files, {
      size: 4, // the max size in MB, defaults to 2MB
      quality: 0.55, // the quality of the image, max is 1,
      maxWidth: 1920, // the max width of the output image, defaults to 1920px
      maxHeight: 1920, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false
    });
    const image = compressedFile[0];
    const base64Str = image.data;
    const imgExt = image.ext;
    const filer = Compress.convertBase64ToFile(base64Str, imgExt);
    const imager = new Image();
    imager.src = URL.createObjectURL(filer);
    this.setState({
      prev: imager.src,
      image: imager.src,
    });
    if (this.props.setRegister) {
      this.props.setRegister(files[0]);
    }
  }

  setEditorRef = editor => { this.editor = editor; };

  logCallback() {
    this.props.setRegister(this.editor.getImage().toDataURL());
  }

  render() {
    const { imageProp } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseLeave={() => {
          if (!this.state.imageSet) {
            this.setState({
              imageSet: true,
            })
            this.props.setRegister(this.editor.getImage().toDataURL())
          }
        }}
      >
        {
          this.state.prev ?
            <AvatarEditor
              ref={this.setEditorRef}
              width={290}
              height={290}
              image={this.state.image}
              onImageReady={this.logCallback.bind(this, 'onImageReady')}
              onMouseUp={() => this.props.setRegister(this.editor.getImage().toDataURL())}
            />
            : null
        }
        <Dropzone 
          onDrop={this.onDrop}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: imageProp ? '290px' : '100px',
            width: imageProp ? '290px' : '700px',
            border: '3px white dashed',
            backgroundImage: imageProp ? `url(${imageProp})` : 'none',
            backgroundPosition: 'center',
            backgroundSize: 'contain'
        }}>
          <div>
            <h3 style={{ color: '#fff' }}>
              {imageProp ? 'Promenite profilnu sliku' : 'Postavite profilnu sliku'}
            </h3>
          </div>
        </Dropzone>
      </div>
    );
  }
}
