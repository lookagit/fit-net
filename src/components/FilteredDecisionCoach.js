import React from 'react';
import AfterSearchItemCouch from './AfterSearchItemCouch';
import IfNoResultsPerson from './IfNoResultsPerson';

const FilteredDecisionCoach = ({ personCl }) => (
  <div>
    {
      personCl.length ?
        personCl.map((item, key) => (
          <AfterSearchItemCouch couchProp={item} key={key} />
        )) :
        <IfNoResultsPerson />
    }
  </div>
);

export default FilteredDecisionCoach;
