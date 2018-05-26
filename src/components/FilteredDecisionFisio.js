import React from 'react';
import AfterSearchItemFisio from './AfterSearchItemFisio';
import LogoBright from '../../static/logoBright.png';
import IfNoResultsFisio from './IfNoResultsFisio';

const FilteredDecisionCoach = ({ fisoCl }) => (
  <div>
    {
      fisoCl.length ?
        fisoCl.map((item, key) => (
          <AfterSearchItemFisio couchProp={item} key={key} />
        )) :
        <IfNoResultsFisio />
    }
  </div>
);

export default FilteredDecisionCoach;
