import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = () => {
   return (
      <div style={{  width: '100%', display: 'flex', justifyContent: 'center' }}>
         <Loader type='BallTriangle' color='#ff7004' height={550} width={80} style={{margin: '0 auto'}} />
      </div>
   );
};

export default Spinner;
