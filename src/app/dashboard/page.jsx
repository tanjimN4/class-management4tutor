const { getServerSession } = require("next-auth");
const { authOptions } = require("../api/auth/[...nextauth]/route");
const { redirect } = require("next/navigation");

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <></>;
};

export default Dashboard;
