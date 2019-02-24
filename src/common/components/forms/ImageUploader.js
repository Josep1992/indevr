import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

const MAX_FILE_SIZE = 32 * 1024 * 1024;

class ImageUploader extends Component {
  static propTypes = {
    className: PropTypes.string,
    imageHandler: PropTypes.func.isRequired,
    onError: PropTypes.func,
    innerText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  };

  static defaultProps = {
    innerText: 'Drop images here or click to select',
  };

  render() {
    const { className, imageHandler, innerText, onError } = this.props;

    return (
      <Dropzone
        onDrop={(files, rejectedFiles) => {
          if (rejectedFiles.length) {
            if (rejectedFiles[0].size > MAX_FILE_SIZE) {
              onError('Files must be smaller than 32MB');
            } else {
              onError('Invalid image file');
            }
          } else {
            const fr = new FileReader();
            fr.onload = function(event) {
              imageHandler(event.target.result);
            };
            fr.readAsDataURL(files[0]);
          }
        }}
        maxSize={MAX_FILE_SIZE}
        accept="image/jpeg, image/png, image/gif"
      >
        {({ getRootProps, getInputProps, isDragActive }) => {
          return (
            <div
              {...getRootProps()}
              className={classNames('dropzone', className, { 'dropzone--isActive': isDragActive })}
            >
              <input {...getInputProps()} />
              {isDragActive ? <p>Drop file here...</p> : innerText}
            </div>
          );
        }}
      </Dropzone>
    );
  }
}

export default ImageUploader;
