import ProfileHeader from "src/components/ProfileHeader"
import ProfileReviews from "src/components/ProfileReviews"

export default function ProfileIndex() {
  return (
    <div className="p-5">
      <ProfileHeader />
      <ProfileReviews />
    </div>
  )
}
