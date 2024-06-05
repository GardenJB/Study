'use client'

import React, { useState } from 'react';

export default function SearchBar() {
  const [searchText, setSearchText] = useState('');

  const doSearch = () => {
    console.log('Search text:', searchText);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      doSearch();
    }
  };

  return (
    <div className='sch_keyword ipsi'>
      <input
        type="text"
        id='inputSearchText'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <a href="javascript:void(0)" onClick={doSearch} className="btn">검색</a>
    </div>
  );
}
