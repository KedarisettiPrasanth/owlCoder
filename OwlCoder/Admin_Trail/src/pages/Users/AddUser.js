import React, { useState } from "react";
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

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { axiosAPI } from "components/VerticalLayout/SidebarContent";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
    const added_by = JSON.parse(localStorage.getItem("authUser"));
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const [file, setFile] = useState();  
    const [data, setData] = useState(
        {
            "first_name":"",
            "last_name":"",
            "email":"",
            "password":"",
            "user_type":"",
            "profile_pic":"",
            "emp_id":"",
            "phone":"",
            "added_by":"",
            "created_date":"",
            "updated_date":"",
            "status":0
        }
    );
    const fileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const updateData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    //Submit 
    const UserAddSubmit = ()=>{
        setFormErrors(validate(data));
        // var err_res = validate(data);  
        // console.log(err_res);  
        // console.log(validate(studentdata).length);
        // let objectLength = Object.entries(err_res).length; 
        // console.log(objectLength);
        //     setFormErrors(validate(data));
        // if(objectLength == 0)
        // {  
        let formData = new FormData();
        formData.append('first_name', data.first_name)
        formData.append('last_name', data.last_name)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('emp_id', data.emp_id)
        formData.append('password', data.password)
        formData.append('user_type', userType);
        formData.append('profile_pic', file);
        formData.append('added_by', added_by.email);
        formData.append('created_date', new Date())
        formData.append('updated_date', new Date())
        formData.append('status', 1);
        // console.log(data)
        axiosAPI.post("http://localhost:5001/register", formData).then((res)=>{
            if(res.status==201){
                // alert("user added")
                toast.success('user Added', {
                    position: "top-right",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                // navigate("/users-list")
            }
        }).catch((error) => {
            console.log(error)
            if (error.response.status === 400) {
             console.log(error.message);
            //  alert("user not added")
             toast.error('not Added', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            }
         })
        // }
    }
    const userTypeOptions = [
        {
            value:'', text:'Select type of User'
        },
        {
            value:'admin', text:'Admin'
        },
        {
            value:'trainer', text:"Trainer"
        }
    ]
    const handleChange = (e)=>{
        setUserType(e.target.value)
    }

    const [userType, setUserType] = useState(userTypeOptions[0].value)

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

    const validate = (values) => {
        const errors = {};
        const email_regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        const mobile_regex = /^(0|91)?[6-9][0-9]{9}$/;
        const emp_id_regex = /^[0-9\b]+$/;
        const name_regex = /^[a-z][a-z\s]*$/;
        if(!values.first_name)
        {
            errors.first_name = "Firstname is required!";
            toast.error('Firstname is required!', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }else if(!name_regex.test(values.first_name)){
            errors.first_name = "Firstname is required";
            toast.error('Invalid Firstname format!', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
        if(!values.last_name)
        {
            errors.last_name = "Lastname is required";
            toast.error('Lastname is required!', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }else if(!name_regex.test(values.last_name)){
            errors.last_name = "Lastname is required";
            toast.error('Invalid Lastname format!', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
        if(!values.email)
        {
            errors.email = "Email is required";
            toast.error('Email is required!', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }else if(!email_regex.test(values.email)){
            errors.email = "Email is required";
            toast.error('Invalid email format!', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
        if(!values.phone)
        {
            errors.phone = "Phone is required";
            toast.error('Phone is required!', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }else if(!mobile_regex.test(values.phone)){
            errors.phone = "Email is required";
            toast.error('Invalid Mobile number format!', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
        if(!values.emp_id)
        {
            errors.emp_id = "Employee id is required";
            toast.error('Employee id is required!', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }else if(!emp_id_regex.test(values.emp_id)){
            errors.emp_id = "Employee id is required";
            toast.error('Only numbers allowed for employee id!', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
        if(!values.password)
        {
            errors.password = "Password is required";
            toast.error('Password is required!', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
        if(!userType)
        {
            errors.password = "Select user type";
            toast.error('Select user type!', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
        if(!file)
        {
            errors.password = "Select profile pic";
            toast.error('Select profile pic!', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
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

            axiosAPI.post("http://localhost:5001/register", {
                user_name:values.username,
                email:values.email,
                password:values.password,
                userType:userType
            }).then((res)=>{
                if(res.status==201){
                    // navigate("/users-list");
                    alert("user added")
                    navigate("/users-list")
                    
                }
            }).catch((err)=>console.log(err))
            
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
                    <Breadcrumbs title="Users" breadcrumbItem="Add User" />
                    <Row>
                        <Col xl="6">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title"></h4>
                                    <p className="card-title-desc"></p>
                                    <Form className="row g-3 needs-validation"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}>
                                            <ToastContainer/>
                                        <Row>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="validationCustom01">Usertype</Label>
                                                    <Input
                                                        name="userType"
                                                        type="select"
                                                        className="form-control"
                                                        id="validationCustom01"
                                                        onChange={handleChange}                                                        
                                                        value={userType}
                                                        invalid={
                                                            validation.touched.userType &&
                                                                validation.errors.userType
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        {
                                                            userTypeOptions.map(option=>(
                                                                <option value={option.value} key={option.value}>{option.text}</option>
                                                            ))
                                                        }
                                                    </Input>
                                                    {validation.touched.userType &&
                                                        validation.errors.userType ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.userType}
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="validationCustom01">Username</Label>
                                                    <Input
                                                        name="username"
                                                        placeholder="Enter Username"
                                                        type="text"
                                                        className="form-control"
                                                        id="validationCustom01"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.username || ""}
                                                        invalid={
                                                            validation.touched.username &&
                                                                validation.errors.username
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.username &&
                                                        validation.errors.username ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.username}
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="validationCustom02">Email</Label>
                                                    <Input
                                                        name="email"
                                                        placeholder="test@test.com"
                                                        type="text"
                                                        className="form-control"
                                                        id="validationCustom02"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.email || ""}
                                                        invalid={
                                                            validation.touched.email &&
                                                                validation.errors.email
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.email &&
                                                        validation.errors.email ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.email}
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="validationCustom03">Password</Label>
                                                    <Input
                                                        name="password"
                                                        placeholder="********"
                                                        type="text"
                                                        className="form-control"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.password || ""}
                                                        invalid={
                                                            validation.touched.password && validation.errors.password
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.city && validation.errors.password ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.password}
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="12">
                                                <FormGroup className="mb-3">
                                                    <div className="form-check">
                                                        <Input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="invalidCheck"
                                                        />
                                                        <Label
                                                            className="form-check-label"
                                                            htmlFor="invalidCheck"
                                                        >
                                                            {" "}
                                                            Agree to terms and conditions
                                                        </Label>
                                                    </div>
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
export default AddUser;