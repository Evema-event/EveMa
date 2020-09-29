import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { saveAs } from 'file-saver';

import classes from './stallDetails.module.css';
import { fileUrl } from '../../../../server';

import btnclasses from '../../../../Layout/button.module.css'

import StallContext from '../../../../context/stall/stallContext';

const StallMoreDetails = () => {
  const stallContext = useContext(StallContext);
  const stall = stallContext.individualStall;

  const urlToPromise = (url) => {
    return new Promise(function (resolve, reject) {
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  const onClickDownload = async () => {
    if (stall?.documents?.length) {
      let zip = new JSZip();
      stall.documents.forEach(async (document, i) => {
        const documentUrl = fileUrl + document;
        let filename = document.split('-');
        filename = `${i + 1} ${filename[filename.length - 1]}`;
        await zip.file(filename, urlToPromise(documentUrl), { binary: true });
      });
      zip.generateAsync({ type: "blob" }).then(content => saveAs(content, stall.productName));
    }
  }

  if (
    !stall ||
    (stall.links.length === 0 &&
      stall.images.length === 0 &&
      stall.documents.length === 0)
  ) {
    return null;
  }
  return (
    <div className={classes['stall-card']}>
      {!stallContext.stalls && <Redirect to='/' />}
      {stall && (
        <>
          {stall && stall.links.length === 0 ? null : (
            <>
              <div>
                <h5 style={{ color: '#ffffff' }}>Link</h5>
                <div className={classes.linkBg}>
                  {stall.links.map((link, i) => (
                    <a
                      href={link}
                      rel='noopener noreferrer'
                      target='_blank'
                      key={i}
                    >
                      {link.slice(0, 25)}
                      {link.length > 25 && ' ... '}
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
          {stall.images.length === 0 ? null : (
            <>
              <div>
                <h5 style={{ color: '#ffffff' }}>Image</h5>
                <div className={classes.imageBg}>
                  {stall.images.map((image, i) => (
                    <img key={i} alt='Demo' src={fileUrl + image} />
                  ))}
                </div>
              </div>
            </>
          )}

          {stall.documents.length === 0 ? null : (
            <div style={{margin: 'auto'}}>
              <button
                type='button'
                className={[
                  'btn btn-primary',
                  btnclasses.next,
                  btnclasses.link,
                  btnclasses['btn-primary'],
                ].join(' ')}
                onClick={onClickDownload}
              >
                Download Documents
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StallMoreDetails;
