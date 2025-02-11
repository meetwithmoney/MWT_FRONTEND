
import ProfileComponent from '../../components/profile/ProfileComponent.tsx'
import PublicLayout from '../../layouts/PublicLayout'

const ProfilePage = () => {
  return (
    <PublicLayout>
    <div className="py-5 h-auto px-4 md:px-0">
      <ProfileComponent />
    </div>
  </PublicLayout>
  )
}

export default ProfilePage
