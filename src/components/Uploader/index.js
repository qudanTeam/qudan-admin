import { Upload, Icon, message, Avatar } from 'antd';
import React from 'react';
// import config from '@/config';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

export default
class Uploader extends React.Component {
  state = {
    loading: false,
  };

  onChangeCallback = (val = null) => {
    const { onChange }  = this.props;
    // const e = new Event();
    // e.target.value
    this.setState({
      value: val,
    });

    if (typeof onChange === 'function') {
      onChange(val);
    }
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    console.log(info);
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log(info.file, 'file');
      const { response } = info.file;
      const { replys } = response;
      // console.log(info.event);
      // this.setState({

      // })
      this.onChangeCallback(replys[0].key);
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   const { value } = state;
  //   const { nextValue } = props;

  //   if (value !== nextValue) {
  //     this.onChangeCallback(value);
  //   }
  // }
  componentDidUpdate() {
    const { value } = this.state;
    const { value: nextValue } = this.props;
    if (value !== nextValue) {
      this.onChangeCallback(value);
    }
  }

  componentDidMount() {
    const { value } = this.props;
    this.onChangeCallback(value);
  }

  render() {

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const { action, value, host } = this.props;
    
    const imageUrl = this.state.imageUrl || value ? `${host}/${value}` : null;
    
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={action}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <Avatar shape="square" size={100} src={imageUrl} /> : uploadButton}
      </Upload>
    );
  }
}