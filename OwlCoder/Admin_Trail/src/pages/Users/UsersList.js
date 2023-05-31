import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Badge  } from "reactstrap";
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
        label: "First Name",
        field: "first_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Last Name",
        field: "last_name",
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
        label: "Profile Pic",
        field: "profile_pic",
        sort: "asc",
        width: 200,
      },
      {
        label: "Emp Id",
        field: "emp_id",
        sort: "asc",
        width: 200,
      },
      {
        label: "Phone",
        field: "phone",
        sort: "asc",
        width: 200,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 200,
      },
      {
        label: "userType",
        field: "user_type",
        sort: "asc",
        width: 200,
      },
      {
        label: "Action",
        field: "action",
      
        width: 200,
      },
    ],
    rows: users
  };
  if(data){
    users.map((item)=>{
      // console.log(item)
      item.profile_pic = (<img src={"../../../Admin_Backend/uploads/user_icons/"+item.profile_pic} alt="image"/>)
      let activeBtn =  ( <Badge className="bg-success badge bg-secondary">ACTIVE</Badge>)
      let inActiveBtn = ( <Badge className="bg-danger badge bg-secondary">INACTIVE</Badge>)
      let isStatus = (item.status === 1 ? activeBtn : inActiveBtn)
      item.status = (isStatus)
      item.action = (<button className="btn btn-danger" ><i className="mdi mdi-account-edit"></i></button>)
    })
  }
  
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