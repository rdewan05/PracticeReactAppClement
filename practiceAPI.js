import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Practice() {
  const url = 'https://randomuser.me/api';
  const [randomJSONData, setRandomJSONData] = useState('');
  const [userInfos, setUserInfo] = useState([]);
  const [nextPageNumber, setNextPageNumber] = useState(1);

  const getNextUser = async () => {

    const randomData = await fetchData(nextPageNumber);
    setRandomJSONData(JSON.stringify(randomData));
    const newUserInfo = [
      ...userInfos,
      ...randomData.data.results,
    ];
    //setUserInfo(randomData.data.results);
    setUserInfo(newUserInfo);
    setNextPageNumber(randomData.data.info.page + 1);

  }

  const getUserFullName = (user) => {
    const { name: { first, last } } = user;
    let fullName = `${first} ${last}`;
    return fullName;
  }

  const fetchData = (nextPageNumber) => {
    return axios.get(url + `?page=${nextPageNumber}`)
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getNextUser();
    // (async () => {
    //   const randomData = await fetchData();
    //   setRandomJSONData(JSON.stringify(randomData));
    //   setUserInfo(randomData.data.results);
    // })();
  }, []);

  return (  
    <div>
      <div></div>
      <button>
        Fetch API-Dummy
			</button>
      <button onClick={() => { getNextUser(); }}>
        Fetch Next User
			</button>
      {userInfos.map((userInfo, id) => (
        <div key={id}>
          <p>{getUserFullName(userInfo)}</p>
          <img src={userInfo.picture.thumbnail}></img>
        </div>
      ))
      }
      <p>{randomJSONData}</p>
    </div>
  );
}

export default Practice;
