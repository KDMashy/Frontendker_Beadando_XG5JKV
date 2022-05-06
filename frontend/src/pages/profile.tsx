import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

import { IUser } from '../interfaces/user.interface'

function Profile() {
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = useCallback(async () => {
    const resp = await axios.get<IUser[]>('http://localhost:3069/user/users');
    setUsers(resp.data);
  }, []);

  useEffect(() => {
    getUsers();
    console.log(users)
  }, []);

  return (
    <div className='site'>
      <div className='maincontent'>
        <div className='defaultContainer'>
          <h1>Profile</h1>
          <p>
            {users[0].email}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile