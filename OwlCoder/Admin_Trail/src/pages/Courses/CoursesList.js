import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { axiosAPI } from "components/VerticalLayout/SidebarContent";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import "../Tables/datatables.scss";

const CoursesList = () => {

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
    useEffect(() => {
    setLoading(true)
    axiosAPI.get("http://localhost:5001/courses-list")
      .then((response) => setCourses(response.data['courses']))
      .finally(() => {
        setLoading(false)
      })
  }, [])
  const data = {
    columns: [
      {
        label: "Course Name",
        field: "course_name",
        sort: "asc",
        width: 150,
      },
      // {
      //   label: "Course Image",
      //   field: "course_icon",
      //   sort: "asc",
      //   width: 270,
      // },
      {
        label: "Course Content",
        field: "course_content",
        sort: "asc",
        width: 200,
      },
      {
        label: "Course Type",
        field: "course_type",
        sort: "asc",
        width: 200,
      },
      {
        label: "Tags",
        field: "tag",
        sort: "asc",
        width: 200,
      },
      {
        label: "Added Date",
        field: "added_date",
        sort: "asc",
        width: 200,
      },
      {
        label: "Updated Date",
        field: "update_date",
        sort: "asc",
        width: 200,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 200,
      },
    ],
    rows: courses
  };

  
  document.title = "Courses List";
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs maintitle="Courses" title="Courses List" breadcrumbItem="Courses List" />

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

export default CoursesList;
