import Loader from '@/components/loading_components/Loader';
import React from 'react';

const loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <Loader></Loader>
        </div>
    );
};

export default loading;