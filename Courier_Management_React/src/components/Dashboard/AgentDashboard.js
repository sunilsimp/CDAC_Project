import React, { Component } from "react";

import "./UserDashboard.css";
// import "../Product/GetUserMenus.css"
import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import GetUserMenus from "../Product/GetUserMenus";
// import ProductServices from "../../services/ProductServices";
// import CustomerServices from "../../services/CustomerServices";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from 'moment';
import DeleteIcon from "@material-ui/icons/Delete";

import RestaurantIcon from "@material-ui/icons/Restaurant";
// import AgricultureIcon from '@mui/icons-material/Agriculture';
// import AgricultureIcon from '@material-ui/icons/Agriculture';
import KitchenIcon from '@material-ui/icons/Kitchen';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import FeedbackIcon from "@material-ui/icons/Feedback";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import AuthServices from "../../configurations/AuthServices";

// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Pagination from "@material-ui/lab/Pagination";
import { FormatListBulletedRounded } from "@material-ui/icons";

const authServices = new AuthServices();
const minDate = new Date(Date.now());
// const customerServices = new CustomerServices();

export default class ExporterDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

            QuantityVehicle: "",
            QuantityVehicleFlag: false,
            FeedBack: "",
            OpenFeedback: false,
            Message: "",
            BordingPoint: "",
            BordingPointFlag: false,
            DroppingPoint: "",
            DroppingPointFlag: false,
            QuantitySeed: "",
            QuantityFlag: false,
            UnitSeed: "",
            UnitSeedFlag: false,
            NumberOfRecordPerPage: 6,
            RequestGoodsFlag: false,
            ProductNameExproter: "",
            ProductNameExproterFlag: false,
            QuantityExporterFarFlag: false,
            QuantityExporterFar: "",
            //
            PageNumber: 0,
            //
            TotalPages: 0,
            TotalRecords: 0,

            Open: false, // Flag For Open Feedback
            OpenLoader: false,
            Feedback: "",
            OpenSnackBar: false,

            Update: false,

            CourierListFlag: true,

            SeedDetailsFlag: false,
            MyOrder: false,
            OpenMyOrder: false,
            Address: "",
            SelectArea: "",
            MyOrderData: [],
            TiffinData: [],

            ExporterNameFlag: false,
            ExporterAddressFlag: false,
            ExporterPhoneNoFlag: false,
            ExporterEmailFlag: false,
            MfgDateFlag: false,
            ExporterName: "",
            ExporterAddress: "",
            ExporterPhoneNo: "",
            ExporterEmail: "",
            MfgDate: "",
            ExpDate: "",
            ExpDateFlag: false,
            ProductType: "",
            ProductTypeFlag: false,
            VehicalNeed: "",
            VehicalNameFlag: false,
            VehicalName: "",
            ExporterPhoneNoVehicle: "",
            ExporterPhoneNoVehicleFlag: false,
            NoOfDays: "",
            NoOfDaysFlag: false,
            TotalPrice: "",
            PriceVehicle: "",
            PriceVehicleFlag: false,
            OrderDateFlag: false,
            OrdernameFlag: false,
            OrderPriceFlag: false,
            OrderDate: "",
            Ordername: "",
            OrderPrice: "",
            SaveOrderId: 0,
            SaveMobileNumber: "",

            OrderDetails: true,


            FromDate: "",
            FromDateFlag: false,
            ToDate: "",
            ToDateFlag: false,
            TiifinPanId: "",
            TiifinPanIdFlag: false,
            TotalDays: "",
            TotalDaysFlag: false,
            BookedBy: "",
            BookedByFlag: false,

            paymentPage: true,
            PaymentModeSelect: "",
            FeedbackFlag: false,
            FeedBack: "",


            ExporterNameFlag: false,
            AgentData: [],

            UpdateStatus: true,
        };
    }

    componentDidMount() {
        this.GetAllAgentData()

    }









    handleSnackBarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ OpenSnackBar: false });
    };

    handlePaging = async (e, value) => {
        let state = this.state;
        console.log("Current Page : ", value);

        this.setState({
            PageNumber: value,
        });

        if (state.MyOrder) {
            await this.GetAllAgentData(value);
        }
    };

    SignOut = async () => {
        await localStorage.removeItem("token");

        this.props.history.push("/SignIn");
    };

    //
    handleCourierListFlag = () => {


        this.setState({
            CourierListFlag: true,
            ProductSellFlag: false,
            SeedDetailsFlag: false,
            RequestGoodsFlag: false,
            MyOrder: false,
            OpenCard: false,
        });


    };



    /////////////////////////////////////////////////////////////////////////////////

    GetAllAgentData = async () => {
        authServices
            .GetAllAgentData()
            .then((data) => {
                console.log("AddressData Data : ", data);
                // debugger
                if (data.data.data !== null) {

                    this.setState({
                        AgentData: data.data.data,

                        OpenLoader: false,
                    });
                }
            })
            .catch((error) => {
                console.log("GetUserAppointments Error : ", error);
                this.setState({ OpenLoader: false });
            });
    };

    handleUpdateSTatus = (id, expectedDeliveryDate, currentLocation, status) => {
        debugger
        let res = {
            "expectedDeliveryDate": expectedDeliveryDate,
            "currentLocation": currentLocation,
            "status": status
        }
        authServices
            .UpdateStatusByAgent(id, res)
            .then((data) => {
                console.log("AddressData Data : ", data);
                // debugger
                if (data.data !== null) {

                    this.setState({
                        UpdateStatus: false,
                        OpenSnackBar: true,
                        Message: data.data.message,

                        OpenLoader: false,
                    });
                    this.GetAllAgentData()
                }
            })
            .catch((error) => {
                console.log("GetUserAppointments Error : ", error);
                this.setState({ OpenLoader: false });
            });
    }


    render() {
        const { UpdateStatus, AgentData,CourierListFlag,OrderDetails, OpenSnackBar, Message} = this.state
        return (
            <div className="UserDashBoard-Container">
                <div className="Sub-Container">
                    <div className="Header">
                        <AppBar position="static" style={{ backgroundColor: "#7a4205" }}>
                            <Toolbar>
                                <Typography
                                    variant="h6"
                                    style={{
                                        flexGrow: 3,
                                        display: "flex",
                                        padding: "5px 0 0 21px",
                                        boxSizing: "border-box",
                                        fontSize: "23px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Courier Management System (Agent)

                                </Typography>
                                <div className="search" style={{ flexGrow: 0.5 }}>
                                    <div className="searchIcon">
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search "
                                        classes={{
                                            root: "inputRoot",
                                            input: "inputInput",
                                        }}
                                        inputProps={{ "aria-label": "search" }}
                                    />
                                </div>

                                <Button
                                    // style={{ flexGrow: 1 }}
                                    color="inherit"
                                    onClick={() => {
                                        this.SignOut();
                                    }}
                                >
                                    LogOut
                                </Button>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <div className="Body">
                        <div className="Sub-Body">
                            <div className="SubBody11">

                                <div
                                    className={CourierListFlag ? "NavButton1" : "NavButton2"}
                                    onClick={() => {
                                        this.handleCourierListFlag();
                                    }}
                                >

                                    <div className="NavButtonText">Courier Details </div>
                                </div>
                                
                            </div>
                            <div className="SubBody22">
                                <div className="bodyContent" >
                                    {CourierListFlag &&
                                        <>

                                            {OrderDetails &&
                                                <>
                                                    <div className="GetUserMenus-SubContainerAdmin">
                                                        <TableContainer component={Paper} className="tableStyle">
                                                            <Table className="" aria-label="simple table">
                                                                {/* {props.State === "UserHome" ? ( */}
                                                                <>
                                                                    <TableHead></TableHead>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell
                                                                                align="center"
                                                                                style={{ width: 50, fontEmailAgent: 600, fontSize: 15 }}
                                                                            >
                                                                                Courier ID
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="center"
                                                                                style={{ width: 200, fontEmailAgent: 600, fontSize: 15 }}
                                                                            >
                                                                                Source
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="center"
                                                                                style={{ width: 100, fontEmailAgent: 600, fontSize: 15 }}
                                                                            >
                                                                                Destination
                                                                            </TableCell>

                                                                            <TableCell
                                                                                align="center"
                                                                                style={{ width: 210, fontEmailAgent: 600, fontSize: 15 }}
                                                                            >
                                                                                Distance
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="center"
                                                                                style={{ width: 210, fontEmailAgent: 600, fontSize: 15 }}
                                                                            >
                                                                                Current Location
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="center"
                                                                                style={{ width: 210, fontEmailAgent: 600, fontSize: 15 }}
                                                                            >
                                                                                Courier Type
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="center"
                                                                                style={{ width: 210, fontEmailAgent: 600, fontSize: 15 }}
                                                                            >
                                                                                Weight
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="center"
                                                                                style={{ width: 210, fontEmailAgent: 600, fontSize: 15 }}
                                                                            >
                                                                                Status
                                                                            </TableCell>

                                                                            <TableCell
                                                                                align="center"
                                                                                style={{ width: 210, fontEmailAgent: 600, fontSize: 15 }}
                                                                            >
                                                                                Created On
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="center"
                                                                                style={{ width: 210, fontEmailAgent: 600, fontSize: 15 }}
                                                                            >
                                                                                Expected Delivery
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="center"
                                                                                style={{ width: 210, fontEmailAgent: 600, fontSize: 15 }}
                                                                            >
                                                                                Payment Mode
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="center"
                                                                                style={{ width: 210, fontEmailAgent: 600, fontSize: 15 }}
                                                                            >
                                                                                Amount
                                                                            </TableCell>

                                                                            <TableCell
                                                                                align="center"
                                                                                style={{ width: 210, fontEmailAgent: 600, fontSize: 15 }}
                                                                            >
                                                                                Action
                                                                            </TableCell>


                                                                        </TableRow>
                                                                    </TableHead>
                                                                </>
                                                                {/* ) : ( */}
                                                                <></>
                                                                {/* )} */}
                                                                <TableBody>
                                                                    {AgentData.length > 0
                                                                        ? AgentData.map((data, index) => {
                                                                            return (
                                                                                <TableRow >
                                                                                    {/* {props.State === "UserHome" ? ( */}
                                                                                    <>
                                                                                        <TableCell align="center" style={{ width: 200 }}>
                                                                                            {data.id}

                                                                                        </TableCell>
                                                                                        <TableCell align="center" style={{ width: 200 }}>
                                                                                            {data.source}

                                                                                        </TableCell>
                                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                                            {data.destination}

                                                                                        </TableCell>
                                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                                            {data.distance}
                                                                                        </TableCell>
                                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                                            {data.currentLocation}
                                                                                        </TableCell>
                                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                                            {data.orderType}
                                                                                        </TableCell>
                                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                                            {data.weight}

                                                                                        </TableCell>
                                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                                            {data.status}

                                                                                        </TableCell>
                                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                                            {data.createdOn}

                                                                                        </TableCell>
                                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                                            {data.expectedDeliveryDate}
                                                                                        </TableCell>
                                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                                            {data.paymentMode}
                                                                                        </TableCell>
                                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                                            {data.amount}
                                                                                        </TableCell>


                                                                                        <TableCell align="center" style={{ width: 100 }}>
                                                                                            {UpdateStatus ?
                                                                                                <button type="button" class="btn btn-secondary" onClick={(e) => this.handleUpdateSTatus(data.id, data.expectedDeliveryDate, data.currentLocation, data.status)}>Update</button> :
                                                                                                <button type="button" class="btn btn-success" >Status Updated</button>}
                                                                                        </TableCell>

                                                                                    </>
                                                                                    {/* ) : ( */}
                                                                                    <></>
                                                                                    {/* )} */}
                                                                                </TableRow>
                                                                            );
                                                                        })
                                                                        : null}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </div>


                                                </>
                                               }


                                        </>

                                    }
                                </div>



                            </div>

                        </div>
                    </div>

                 
                </div>
                <Backdrop
                    style={{ zIndex: "1", color: "#fff" }}
                    open={this.state.OpenLoader}
                    onClick={() => {
                        this.setState({ OpenLoader: false });
                    }}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={OpenSnackBar}
                    autoHideDuration={2000}
                    onClose={this.handleSnackBarClose}
                    message={Message}
                    action={
                        <React.Fragment>
                            <Button
                                color="secondary"
                                size="small"
                                onClick={this.handleSnackBarClose}
                            >
                                UNDO
                            </Button>
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={this.handleSnackBarClose}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </div >
        );
    }
}
