import React from 'react';

const DumbDate = ({ date, isDate }) => {
  const realDate = new Date(date);
  const realDateReform = `${realDate.getDate()}.${(realDate.getMonth() + 1)}.${realDate.getFullYear()}`;
  return (
    <h3 style={{ color: '#fff' }}>{`${isDate ? '' : 'Datum rodjenja: '} ${realDateReform}`}</h3>
  );
};

export default DumbDate;
