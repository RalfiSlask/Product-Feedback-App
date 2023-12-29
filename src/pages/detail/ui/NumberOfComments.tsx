import React from 'react';

const NumberOfComments: React.FC<{ commentCount: number }> = ({
  commentCount
}) => {
  return (
    <h2 className='text-[1.125rem] text-[#3A4374] tracking-[-0.25px] font-bold'>
      <span>{commentCount}</span> Comments
    </h2>
  );
};

export default NumberOfComments;
