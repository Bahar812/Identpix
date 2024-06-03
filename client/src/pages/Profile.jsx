import React from 'react'

import BottomBar from '../components/BottomBar'
import { useParams } from 'react-router-dom'

const Profile = () => {

  const { userId } = useParams()

  return (
    <div className="flex flex-col h-screen items-start justify-between gap-4">
      <div>Halo</div>
      <BottomBar home={false} userId={userId} />
    </div>
  )
}

export default Profile