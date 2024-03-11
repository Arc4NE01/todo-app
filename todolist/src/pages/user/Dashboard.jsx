import React from "react";
import Layout from "../../Components/Layout";
import { useAuth } from "../../Context/context";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"User Dashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <div className="info">
                <h3>User Name: {auth?.user?.name}</h3>
                <h3>User Email: {auth?.user?.email}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
