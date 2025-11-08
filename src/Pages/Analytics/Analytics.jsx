import AnalyticsInfo from "../../Components/Dashboard/AnalyticsInfo/AnalyticsInfo";
// import SubscriptionGrowth from "../../Components/Dashboard/SubscriptionGrowth/SubscriptionGrowth";
// import UserGrowth from "../../Components/Dashboard/UserGrowth/UserGrowth";
import RecentBooking from "../../Components/RecentBooking/RecentBooking";

const Analytics = () => {
  return (
    <div>
      <AnalyticsInfo />
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SubscriptionGrowth />
        <UserGrowth />
      </div> */}
      <RecentBooking />
    </div>
  );
};

export default Analytics;
