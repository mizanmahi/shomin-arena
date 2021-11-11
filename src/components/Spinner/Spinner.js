import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = () => {
   return (
      <div style={{ alignSelf: 'center', justifySelf: 'center' }}>
         <Loader type='BallTriangle' color='#ff7004' height={550} width={80} />
      </div>
   );
};

export default Spinner;
