import React from 'react'
import UpdateCommonProfile from '../../components/UpdateCommonProfile/UpdateCommonProfile'
import { useSelector } from 'react-redux'

const UpdateUserProfile = () => {

    const {data, loading, error} = useSelector(state => state.authMe)

  return (
    <>
        <UpdateCommonProfile 
          user={data}
          loading={loading}
          error={error}
          shopProduct={null}
          shopOrder={null}
         />
    </>
  )
}

export default UpdateUserProfile