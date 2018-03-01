import React from 'React';
import Uppy from '../Uppy';
import { withRouter } from 'react-router-dom';


const UploadCertificates = props => (
  <div
    onClick={() => {
      console.log("JA SAM PROPPSSSSSSSSSSs ", props);
    }}
    style={{
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto',
    }}
  >
    <h2>KOKO LOKO</h2>
  </div>
);
export withRouter(UploadCertificates);