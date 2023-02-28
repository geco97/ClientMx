import React, { Component, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone';
import Alert from '@material-ui/lab/Alert';
import { isEmpty,isUndefined } from 'lodash';

const baseStyle = {
    fontSize: '1.4rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'grey',
    borderStyle: 'dashed',
    backgroundColor: 'white',
    color: 'grey',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: '150px',
};
const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};
function StyledDropzone(props) {
    let messageLaddaFile="Dra och släpp fil här, eller klicka för att välja."
    const style = useMemo(() => ({
        ...baseStyle
    }), []);
    const onDrop = (acceptedFiles) => {
      props.getFile(acceptedFiles)
    }
    const maxSize = 20485760;
    
    return (
        <div className="text-center">
        <Dropzone onDrop={onDrop}
        accept={isEmpty(props.Type)?".xlsx, .xls, .pdf":`.xlsx, .xls`}
        minSize={0}
        maxSize={20485760}
        >
          {({getRootProps, getInputProps, isDragActive,isDragAccept ,isDragReject,rejectedFiles,acceptedFiles}) => {
              const isFileTooLarge =!isUndefined(rejectedFiles) && rejectedFiles[0].size > maxSize;
              return (<div {...getRootProps({style})}>
              <input {...getInputProps()} />
              {!isDragReject && !isDragAccept && !isDragActive && messageLaddaFile}
              {isDragActive && "Drop it like it's hot!"}
              {!isUndefined(rejectedFiles) && (
                  <Alert severity="error">File type not accepted, sorry!!</Alert>
                )}
              {acceptedFiles.length === 1 && (
                  <Alert severity="info">File type accepted!</Alert>
                )}              
              {acceptedFiles.length > 1 && (
                  <Alert severity="Error">1 file is the maximum number of files !</Alert>
                )}              
              {isFileTooLarge && (
                  <Alert severity="warning">File is too large.</Alert>
               )}
             {acceptedFiles.length === 1 && acceptedFiles.map(acceptedFile => {
                  return <Alert severity="success">{acceptedFile.name}</Alert>
             })}
            </div>
            )
            }
        }
        </Dropzone>
      </div>
    )
}

export default class FileDrop extends Component {
    getFile=(file)=>{
        this.props.onchangeHanel(file)
    }
    render() {
       return (
            <div>
                <StyledDropzone 
                getFile={this.getFile} 
                file={this.props.Value}
                Type={isUndefined(this.props.Type)?"":this.props.Type}
                />
               {/* */}
            </div>
        )
    }
}