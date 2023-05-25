import React, { useState, useEffect } from "react";
const FormData = require('form-data');
import {
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Button,
    CardTitle,
    CardSubtitle,
    Label,
    Input,
    Container,
    Form,
    FormFeedback
} from "reactstrap";
import Select from "react-select";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { axiosAPI } from "components/VerticalLayout/SidebarContent";
import { useNavigate } from "react-router-dom";
import { options } from "toastr";


const AddBatch = (props) => {
    const [data, setData] = useState();
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null);
    useEffect(() => {
        setLoading(true)
        axiosAPI.get("http://localhost:5001/users-list")
            .then((response) => setUsers(response.data['users']))
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const fileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const updateData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const optionGroup = users.map((ele) => {
        return { label: ele.user_name, value: ele.user_name }
    });
    const [selectedMulti, setselectedMulti] = useState(null);


    function handleMulti(selectedMulti) {
        setselectedMulti(selectedMulti);
    }


    const navigate = useNavigate();

    const courseIconsOptions = [
        {
            value: '', text: 'Select type of Course'
        },
        {
            value: 'admin', text: 'Admin'
        },
        {
            value: 'trainer', text: "Trainer"
        }
    ]
    const handleChange = (e) => {
        // let formData = new FormData

        // formData.append(e.target.name, e.target.files[0])
        // setCourseIcons(e.target.value)
        // alert(e.target.value)

    }
    const [courseIcon, setCourseIcons] = useState(courseIconsOptions[0].value)

    function handleSubmit(e) {
        e.preventDefault();

        var fnm = document.getElementById("validationTooltip01").value;
        var lnm = document.getElementById("validationTooltip02").value;
        var unm = document.getElementById("validationTooltipUsername").value;
        var city = document.getElementById("validationTooltip03").value;
        var stateV = document.getElementById("validationTooltip04").value;

        if (fnm === "") {
            setfnm(false);
        } else {
            setfnm(true);
        }

        if (lnm === "") {
            setlnm(false);
        } else {
            setlnm(true);
        }

        if (unm === "") {
            setunm(false);
        } else {
            setunm(true);
        }

        if (city === "") {
            setcity(false);
        } else {
            setcity(true);
        }

        if (stateV === "") {
            setstateV(false);
        } else {
            setstateV(true);
        }

        var d1 = document.getElementsByName("validate");

        document.getElementById("tooltipForm").classList.add("was-validated");

        for (var i = 0; i < d1.length; i++) {
            d1[i].style.display = "block";
        }
    }

    //for change tooltip display propery
    function changeHandeler(event, eleId) {
        if (event.target.value !== "")
            document.getElementById(eleId).style.display = "none";
        else document.getElementById(eleId).style.display = "block";
    }


    // Form validation 
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            firstname: 'Mark',
            lastname: 'Otto',
            city: 'City',
            state: 'State',
            zip: 'Zip',
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required("Please Enter Your First Name"),
            lastname: Yup.string().required("Please Enter Your Last Name"),
            city: Yup.string().required("Please Enter Your City"),
            state: Yup.string().required("Please Enter Your State"),
            zip: Yup.string().required("Please Enter Your Zip"),
        }),
        onSubmit: (values) => {


        }
    });

    // Form validation 
    const validationType = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            username: '',
            password: '',
            password1: '',
            email: '',
            digits: '',
            number: '',
            alphanumeric: '',
            textarea: '',
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required(
                "This value is required"
            ),
            password: Yup.string().required(
                "This value is required"
            ),
            password1: Yup.string().when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Both password need to be the same"
                ),
            }),
            email: Yup.string()
                .email("Must be a valid Email")
                .max(255)
                .required("Email is required"),
            url: Yup.string()
                .matches(
                    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                    "Enter correct url!"
                )
                .required("Please enter correct Url"),
            digits: Yup.number().required(
                "Please Enter Your Digits"
            ),
            number: Yup.number().required(
                "Please Enter Your Number"
            ),
            alphanumeric: Yup.string()
                .matches(
                    /^[a-z0-9]+$/i,
                    "Enter correct Alphanumeric!"
                )
                .required("Please Enter Your Alphanumeric"),
            textarea: Yup.string().required(
                "Please Enter Your Textarea"
            ),
        }),
        onSubmit: (values) => {
            console.log("values", values);
        }
    });
    const regExp = /\b\d{5}\b/;
    // Form validation 
    const rangeValidation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            min_Length: '',
            max_Length: '',
            range_Length: '',
            min_Value: '',
            max_Value: '',
            range_Value: '',
            regular_Exp: '',
        },
        validationSchema: Yup.object().shape({
            min_Length: Yup.string()
                .min(6, "Must be exactly 6 digits")
                .required("Min 6 chars"),
            max_Length: Yup.string()
                .max(6, "Must be exactly 6 digits")
                .required("Max 6 chars"),
            range_Length: Yup.string().required(
                "range between 5 to 10"
            ).min(5, "This value should be between 5 and 10")
                .max(10, "This value should be between 5 and 10"),
            min_Value: Yup.string().required("Min Value 6").test('val', 'This value should be greater than or equal to 6', val => val >= 6),
            max_Value: Yup.string().required("Max Value 6").matches(/^[0-6]+$/, "This value should be lower than or equal to 6."),
            range_Value: Yup.string().required(
                "range between 5 to 10"
            ).min(5, "This value should be between 5 and 10")
                .max(10, "This value should be between 5 and 10"),
            regular_Exp: Yup.string()
                .matches(
                    /^[#0-9]+$/,
                    "Only Hex Value"
                )
                .required("Only Hex Value"),
        }),
        onSubmit: (values) => {
            console.log("values", values);
        }
    });

    const [formValidation, setValidation] = useState({
        fnm: null,
        lnm: null,
        unm: null,
        city: null,
        stateV: null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        const modifiedV = { ...formValidation };
        var fnm = document.getElementById("validationTooltip01").value;
        var lnm = document.getElementById("validationTooltip02").value;
        var unm = document.getElementById("validationTooltipUsername").value;
        var city = document.getElementById("validationTooltip03").value;
        var stateV = document.getElementById("validationTooltip04").value;

        if (fnm === "") {
            modifiedV["fnm"] = false;
        } else {
            modifiedV["fnm"] = true;
        }

        if (lnm === "") {
            modifiedV["lnm"] = false;
        } else {
            modifiedV["lnm"] = true;
        }

        if (unm === "") {
            modifiedV["unm"] = false;
        } else {
            modifiedV["unm"] = true;
        }

        if (city === "") {
            modifiedV["city"] = false;
        } else {
            modifiedV["city"] = true;
        }

        if (stateV === "") {
            modifiedV["stateV"] = false;
        } else {
            modifiedV["stateV"] = true;
        }
        setValidation(modifiedV);
    }

    //for change tooltip display propery
    const onChangeValidation = (fieldName, value) => {
        const modifiedV = { ...validation };
        if (value !== "") {
            modifiedV[fieldName] = true;
        } else {
            modifiedV[fieldName] = false;
        }
        setValidation(modifiedV);
    };

    document.title = "Form Validation | Veltrix - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Courses" breadcrumbItem="Add Course " />
                    <Row>
                        <Col xl="12">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title"></h4>
                                    <p className="card-title-desc"></p>
                                    <Form className="row g-3 needs-validation"
                                        name="form"
                                        encType="multipart/form-data"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            let formData = new FormData();
                                            formData.append("course_icon1", file);
                                            formData.append("course_name", data.course_name)
                                            formData.append("course_content", data.course_content)
                                            formData.append("status", 1);
                                            formData.append("course_type", 'subcourse');
                                            formData.append("added_date", new Date());
                                            formData.append("update_date", new Date());
                                            formData.append("added_by", 'tester');
                                            formData.append("tag", data.tag);
                                            // for (const value of formData.values()) {
                                            //     console.log(value);
                                            //   }
                                            //console.log(formData);
                                              const config = {     
                                                headers: {
                                                    "Content-Type": "multipart/form-data",
                                                    "x-rapidapi-host": "file-upload8.p.rapidapi.com",
                                                    "x-rapidapi-key": "your-rapidapi-key-here",
                                                  }
                                            }
                                            // data['course_icon1'] = file;
                                            // data['status'] = 1;
                                            // data['course_type'] = 'subcourse';
                                            // data['added_date'] = new Date();
                                            // data['update_date'] = new Date();
                                            // data['added_by'] = 'tester'

                                            axiosAPI.post("http://localhost:5001/add-course",formData, config
                                                // course_name: values.coursename,
                                                // // course_icon: values.courseicon,
                                                // course_icon1: file,
                                                // course_content: values.coursecontent,
                                                // course_type: values.coursetype,
                                                // tag: values.tags,
                                                // added_date: new Date(),
                                                // added_by: localStorage.getItem("authUser")['username'],
                                                // status: 1
                                            ).then((res) => {
                                                if (res.status == 201) {
                                                    // navigate("/users-list");
                                                    alert("Course added")
                                                    console.log(res)
                                                }
                                            }).catch((err) => console.log(err))
                                            // validation.handleSubmit();
                                            // return false;
                                        }}>
                                        <Row>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="validationCustom01">Batch Name</Label>
                                                    <Input
                                                        name="course_name"
                                                        placeholder="Enter Course Name"
                                                        type="text"
                                                        className="form-control"
                                                        id="validationCustom01"
                                                        onChange={updateData}
                                                        onBlur={validation.onBlur}
                                                        value={updateData['course_name']}
                                                        invalid={
                                                            validation.touched.coursename &&
                                                                validation.errors.coursename
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.coursename &&
                                                        validation.errors.coursename ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.coursename}
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                            {/* <Col md="3">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="validationCustom01">Select Course Icon</Label>
                                                    <Input
                                                        name="courseicon"
                                                        type="select"
                                                        className="form-control"
                                                        id="validationCustom01"
                                                        onChange={handleChange}
                                                        value={courseIcon || ""}
                                                        invalid={
                                                            validation.touched.courseicon &&
                                                                validation.errors.courseicon
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        {
                                                            courseIconsOptions.map(option => (
                                                                <option value={option.value} key={option.value}>{option.text}</option>
                                                            ))
                                                        }
                                                    </Input>
                                                    {validation.touched.courseicon &&
                                                        validation.errors.courseicon ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.courseicon}
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col> */}
                                            {/* <Col md="1" className="text-center">
                                                <FormGroup>
                                                    <Label htmlFor="validationCustom01"></Label><br></br>
                                                    <Label htmlFor="validationCustom01">(OR)</Label>
                                                </FormGroup>
                                            </Col> */}
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="validationCustom01">Choose Batch Icon</Label>
                                                    <Input
                                                        name="course_icon1"
                                                        type="file"
                                                        className="form-control"
                                                        id="validationCustom01"
                                                        onChange={e => { validation.handleChange(e); fileChange(e) }}
                                                        // onChange={updateData}
                                                        onBlur={validation.handleBlur}
                                                        value={updateData.course_icon1}
                                                        invalid={
                                                            validation.touched.courseicon1 &&
                                                                validation.errors.courseicon1
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                    </Input>
                                                    {validation.touched.courseicon1 &&
                                                        validation.errors.courseicon1 ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.courseicon1}
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="validationCustom01">Batch Description</Label>
                                                    <Input
                                                        name="course_content"
                                                        placeholder="Enter Course Content"
                                                        type="textarea"
                                                        rows="5"
                                                        className="form-control"
                                                        id="validationCustom01"
                                                        onChange={updateData}
                                                        onBlur={validation.handleBlur}
                                                        value={updateData['course_content']}
                                                        invalid={
                                                            validation.touched.coursecontent &&
                                                                validation.errors.coursecontent
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.coursecontent &&
                                                        validation.errors.coursecontent ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.coursecontent}
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="validationCustom01">Tags</Label>
                                                    <Input
                                                        name="tag"
                                                        placeholder="driveready, tse.."
                                                        type="text"
                                                        className="form-control"
                                                        id="validationCustom01"
                                                        onChange={updateData}
                                                        onBlur={validation.handleBlur}
                                                        value={updateData['tag']}
                                                        invalid={
                                                            validation.touched.tags &&
                                                                validation.errors.tags
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.tags &&
                                                        validation.errors.tags ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.tags}
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label className="control-label">Select Trainer to Map</Label>
                                                    <Select
                                                        name="trainertomap"
                                                        value={selectedMulti}
                                                        isMulti={true}
                                                        onChange={() => {
                                                            handleMulti();
                                                        }}
                                                        options={optionGroup}
                                                        classNamePrefix="select2-selection"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <div className="col-12">
                                            <button className="btn btn-primary" type="submit">Submit form</button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl="6">

                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
};
export default AddBatch;