import { Upload, Icon, message, Avatar } from 'antd';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';
import { Promise } from 'es6-promise';
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

function getKeyFromResponse(response) {
  const { replys } = response;
  if (!replys) {
    return '';
  }

  if (!replys[0]) {
    return '';
  }
  const urlKey = replys[0].key;
  return urlKey
}

function getKeyFromFile(file) {
  if (file && file.key) {
    return file.key;
  }
  if (file && file.response) {
    return getKeyFromResponse(file.response);
  }
  return '';
}

export default
class Uploader extends PureComponent {
  state = {
    loading: false,
    id: 0,
    value: '',
    showFileList: [],
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

  addID = () => {
    const { id } = this.state;

    this.setState({
      id: id + 1,
    });
  }

  handleBeforeUpload = (file) => {
    const res = beforeUpload(file);
    const fileList = this.state.showFileList.filter(f => f.status === 'done');

    return new Promise((resolve, reject) => {
      this.setState({
        showFileList: [...fileList],
      }, () => {
        
        this.onChangeCallback(fileList.map(getKeyFromFile).join(','));
        
        if (res) {
          resolve(true);
        } else {
          reject(res);
        }
      });
    })
    

    // return res;
  }

  handleChange = ({ file, fileList }) => {
    // console.log(file, 'change');
    // console.log(fileList, 'change2');
    if (file.status === 'uploading') {
      this.setState({ loading: true });
    } else if (file.status === 'done') {
      this.onChangeCallback(fileList.map(getKeyFromFile).join(','));
      this.setState({ loading: false });
    }
    this.setState({
      showFileList: [...fileList],
    });
  }

  handleRemove = (file) => {

    return new Promise((resolve, reject) => {

      try {
        const fileList = this.state.showFileList.filter(f => f.uid !== file.uid);
    
        this.setState({
          showFileList: fileList,
        }, () => {
          this.onChangeCallback(fileList.map(getKeyFromFile).join(','));
          resolve(true);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  static getDerivedStateFromProps(props, state) {
    const { showFileList = [], value: stateValue } = state;
    const { value = '', host } = props;

    const genFileListItem = (key) => {
      // const { host } = this.props;
      
      const res = {
        uid: uuid(),
        key: key,
        name: key,
        status: 'done',
        url: `${host}/${key}`,
      }
      return res;
    }

    if (value && !stateValue && showFileList.length <= 0) {
      const fls = value.split(',');
      return {
        showFileList: fls.map(genFileListItem),
        value: value,
      };
    }

    return null;
  }

  componentDidUpdate() {
    const { value } = this.state;
    const { value: nextValue } = this.props;
    if (value !== nextValue) {
      this.onChangeCallback(value);
    }
  }

  render() {

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    // mode is single or multi
    const { action, isSingle = true } = this.props;
    const { showFileList } = this.state;
    
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={{showRemoveIcon: true, showPreviewIcon: false}}
        fileList={showFileList}
        action={action}
        beforeUpload={this.handleBeforeUpload}
        onChange={this.handleChange}
        onRemove={this.handleRemove}
      >
        {(isSingle && showFileList.length >= 1) ? null : uploadButton}
      </Upload>
    );
  }
}