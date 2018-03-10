import React from 'react';

const DumbDate = ({date}) => {
  const realDate = new Date(date);
  console.log(date);
  const realDateReform = `${realDate.getDate()}-${(realDate.getMonth() + 1)}-${realDate.getFullYear()}`;
  return (
    <h3 style={{ color: '#fff' }}>{`Datum rodjenja: ${realDateReform}`}</h3>
  );
};

export default DumbDate;
