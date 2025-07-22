import React from 'react'
import useLogout from '../../api/auth/useLogout';

const LogoutButton = () => {
  const {loading, logout} = useLogout()
  return (
    <div >
      {!loading ? (
        <button className='w-full text-lg font-lato text-white bg-[#13665b] py-3 hover:bg-[#05F2C7] rounded-lg' onClick={logout}>
          Logout
        </button>
      ) : (
        <span className='loading loading-spinner'></span>
      )
    }
    </div>
  )
}

export default LogoutButton