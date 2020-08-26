import React from 'react';

const stallList = () => {
  return(
      <div>
         <div className='stall-bg'>
           <div className='product-name'>
            <h5>Product Name</h5>
            <div className='product-bg product-color'>
             The Terminator
            </div>
           </div>
         <div className='product-name'>
         <h5>Company</h5>
         <div className='product-field product-color'>
          Genisys
         </div>
        </div>
        <div className='product-name'>
         <h5>Domain</h5>
         <div className='product-value product-color'>
          A.I Robotics
         </div>
        </div>
        <div className='product-desc'>
         <h5>Description</h5>
         <div className='product-description product-color'>
         The Robot that is here to save Sarah Connor thereby saving the human race.
         </div>
        </div>
       </div>
    </div>
  )
};

export default stallList;
