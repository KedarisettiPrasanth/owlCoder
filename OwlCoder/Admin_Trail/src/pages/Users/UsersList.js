import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import SidebarContent, { axiosAPI } from "components/VerticalLayout/SidebarContent";
import AddCourse from "pages/Courses/AddCourse";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import "../Tables/datatables.scss";
const UsersList = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
    useEffect(() => {
    setLoading(true)
    axiosAPI.get("http://localhost:5001/users-list")
      .then((response) => setUsers(response.data['users']))
      .finally(() => {
        setLoading(false)
      })
  }, [])
  const data = {
    columns: [
      {
        label: "Username",
        field: "user_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 270,
      },
      {
        label: "Password",
        field: "password",
        sort: "asc",
        width: 200,
      },
      {
        label: "userType",
        field: "userType",
        sort: "asc",
        width: 200,
      },
    ],
    rows: users
  };

  
  document.title = "Users List";
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs maintitle="Users" title="Users List" breadcrumbItem="Users List" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4"></CardTitle>
                  <p className="card-title-desc"></p>
                  {console.log(data['rows'])}
                  <MDBDataTable responsive bordered data={data} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UsersList;
//exports.users = users;
