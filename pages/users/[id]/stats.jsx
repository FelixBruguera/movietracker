import ProfileHeader from "src/components/ProfileHeader"
import ReviewsStats from "src/components/ReviewsStats"
import DiaryStats from "src/components/DiaryStats"

export default function ProfileStats() {
  return (
    <div className="p-5">
      <ProfileHeader />
      <ReviewsStats />
      <DiaryStats />
    </div>
  )
}
