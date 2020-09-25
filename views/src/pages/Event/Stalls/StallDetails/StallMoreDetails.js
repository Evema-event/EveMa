import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import classes from './stallDetails.module.css';
import { fileUrl } from '../../../../server';

import StallContext from '../../../../context/stall/stallContext';

const StallMoreDetails = () => {
  const stallContext = useContext(StallContext);
  const stall = stallContext.individualStall;

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
            <div>
              <button
                type='button'
                className={[
                  'btn btn-primary btn-block',
                  classes.next,
                  classes.link,
                  classes['btn-primary'],
                ].join(' ')}
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
