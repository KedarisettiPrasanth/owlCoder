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
  const [imagePath, setImagePath] = useState();
  const [loading, setLoading] = useState(false)
    //Fetch all users list from db
    useEffect(() => {
    setLoading(true)
    axiosAPI.get("http://localhost:5001/users-list")
      .then((response) => setUsers(response.data['users']))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  //getting profile pic path from node server
  // useEffect(()=>{

  //   async function fetchImagePath() {
  //     try {
  //       const response = await axiosAPI.get("http://localhost:5001/profile_pic");
  //       setImagePath(response.data.profile_pic_path);
  //     } catch (error) {
  //       console.error('Error fetching image path:', error);
  //     }
  //   }

  //   fetchImagePath();  


  // })
  //console.log(imagePath)
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
    ],
    rows: users
  };
  if(data){
    users.map((item)=>{
      console.log(item.profile_pic)
      item.profile_pic = (<img src={"http://localhost:5001/user-icons/"+ item.profile_pic} alt="image" height="75px" width="75px"/>)
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
                  <MDBDataTable className="text-center" responsive bordered data={data} />
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
