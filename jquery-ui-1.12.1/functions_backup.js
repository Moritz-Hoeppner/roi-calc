var developement = false;

function setup() {
    if (developement) {
        setFalseRide_Amount("#FalseRide_Amount");
        timeSavingsAdmin();
        costSavingFalseRides();
    }
    modifyWizard();
    settingEventListeners();
    createSliders();

    $(document).ready(function () {
        setTotalTime("#Workload_Mail_Total", "#specification-menu-email", ".res-roi-section-input-number");
        setTotalTime("#Workload_Mail", "#specification-menu-email", ".res-roi-section-input-number");

        setTotalTime("#phone-total", "#specification-menu-phone", ".res-roi-section-input-number");
        setTotalTime("#Workload_Phone", "#specification-menu-phone", ".res-roi-section-input-number");

        setTotalTime("#Workload_Fax_Total", "#specification-menu-fax", ".res-roi-section-input-number");
        setTotalTime("#Workload_Fax", "#specification-menu-fax", ".res-roi-section-input-number");

        setTotalTime("#portal-total", "#specification-menu-portal", ".res-roi-section-input-number");
        setTotalTime("#Workload_Portal", "#specification-menu-portal", ".res-roi-section-input-number");

        setPercentageTotal("#percentage-total", "#medium-percentage-container", ".res-roi-section-input-number");
        setPercentageTotal("#FalseRide_Reason_Total", "#reasons-wrong-pickups-percentage-container", ".res-roi-section-input-number");

        collectingData();
    });


}

//creating wizard
$(document).ready(function () {
    $("#res-roi-wizard").steps({
        headerTag: ".res-roi-section-steps-label",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        stepsOrientation: "vertical",
        autoFocus: true,
        enableKeyNavigation: false,
        enablePagination: false,
        suppressPaginationOnFocus: true,
        stepsContainerTag: "res-roi-section-steps-container",


    });
});

//hiding exsiting documents
function modifyWizard() {
    $(document).ready(function () {
        $(".actions").remove();

        $("#res-roi-button-previous").click(function () {
            GoPrevious("#res-roi-button-previous", "#res-roi-button-next", "#res-roi-button-start");
        });

        $("#res-roi-button-next").click(function () {
            GoNext("#res-roi-wizard-p-", ".res-roi-input-all", ".res-roi-percentage-input", "#res-roi-button-next", "#res-roi-button-previous", 5, ".res-roi-section-input-error");
            $('#res-roi-evaluation-summaryText').html(updateEvaluationText());
        });

        $("#res-roi-button-start").click(function () {
            StartRoi("#res-roi-wizard-p-", "#res-roi-button-next", "#res-roi-button-previous")
        });


        //    adding steps header
        $("res-roi-section-steps-container").prepend("<div class=\"res-roi-steps-header\">Berechnen Sie Ihre Vorteile</div>")

        $(".res-roi-steps-header").append("<div class=\"res-roi-disable-steps-action\"></div>");

        $('[role="tablist"] li:eq(1)').css('border-top', '1px solid rgba(255, 255, 2555, .5)');
        $('[role="tablist"] li:eq(1)').css('margin-top', '10px');
        $('[role="tablist"] li:eq(1)').css('padding-top', '10px');
        $('[role="tablist"] li:eq(4)').css('margin-bottom', '10px');
        $('[role="tablist"] li:eq(5)').css('border-top', '1px solid rgba(255, 255, 2555, .5)');
    });
}

//adding event listeners
function settingEventListeners() {
    $(document).ready(function () {
        $("#res-roi-send-evalution-button").click(function () {
            var formdata = collectingData();
            if(validateEmail()){
                sendMail();
                makePost();
                $("#res-roi-send-evalution-button-error-mail").css("display", "none");
                $(".res-roi-action-input").html('<h3 Style="color: black">Wir haben Ihre Ergebnisse erhalten und werden Ihnen demnächst einen personalisierten Bericht per Mail zukommen lassen.</h3><br><br><h4><a href="https://www.resourcify.de/mehr-erfahren/digital-ist-besser/">Lesen Sie hier wie Augustin Entsorgung durch unsere  Lösungen profitieren konnte</a>');
                $("#res-roi-send-evalution-button").css("display", "none");
            }
            else{
                $("#res-roi-send-evalution-button-error-mail").css("display", "inherit");
            }
            if(formdata.Customer_Name === ""){$("#res-roi-send-evalution-button-error-name").css("display", "inherit");return;}
            console.log("hey");
            $("#res-roi-send-evalution-button-error-name").css("display", "none");
            if(formdata.Customer_Phone === ""){$("#res-roi-send-evalution-button-error-phone").css("display", "inherit");return;}
            $("#res-roi-send-evalution-button-error-phone").css("display", "none");
        });
//        ****Mail specify Menu ***

//        open specify menu on focus
        $("#Workload_Mail").focus(function () {
            OpenSpecifyMenu("#specification-menu-email", "#res-roi-button-next", "#res-roi-button-previous");
            $("#Workload_Mail_Open").focus();
        });

        //update Total Value of Time at the mail specification menu
        $("#specification-menu-email .res-roi-section-input-number").change(function () {
            setTotalTime("#Workload_Mail_Total", "#specification-menu-email", ".res-roi-section-input-number");
        });

//        close spedify menu for email on fertig click
        $("#res-roi-button-mail-done").on('click', function () {
            CloseSpecifyMenu("#specification-menu-email", "#res-roi-button-next", "#res-roi-button-previous", "#Workload_Mail", ".res-roi-section-input-number");
        });

//        ****Phone specify Menu ***


//        open specify menu on focus
        $("#Workload_Phone").focus(function () {
            OpenSpecifyMenu("#specification-menu-phone", "#res-roi-button-next", "#res-roi-button-previous");
            $("#Workload_Phone_Accept").focus();

        });


        //update Total Value of Time at the mail specification menu
        $("#specification-menu-phone .res-roi-section-input-number").change(function () {
            setTotalTime("#phone-total", "#specification-menu-phone", ".res-roi-section-input-number")
        });

//        close spedify menu for email on fertig click
        $("#res-roi-button-phone-done").on('click', function () {
            CloseSpecifyMenu("#specification-menu-phone", "#res-roi-button-next", "#res-roi-button-previous", "#Workload_Phone", ".res-roi-section-input-number");
        });


        //        ****Fax specify Menu ***

//        open specify menu on focus
        $("#Workload_Fax").focus(function () {
            OpenSpecifyMenu("#specification-menu-fax", "#res-roi-button-next", "#res-roi-button-previous");
        });

        //update Total Value of Time at the mail specification menu
        $("#specification-menu-fax .res-roi-section-input-number").change(function () {
            setTotalTime("#Workload_Fax_Total", "#specification-menu-fax", ".res-roi-section-input-number")
        });

//        close spedify menu for email on fertig click
        $("#res-roi-button-fax-done").on('click', function () {
            CloseSpecifyMenu("#specification-menu-fax", "#res-roi-button-next", "#res-roi-button-previous", "#Workload_Fax", ".res-roi-section-input-number");
        });

        //        ****Portal specify Menu ***

//        open specify menu on focus
        $("#Workload_Portal").focus(function () {
            OpenSpecifyMenu("#specification-menu-portal", "#res-roi-button-next", "#res-roi-button-previous");
        });

        //update Total Value of Time at the mail specification menu
        $("#specification-menu-portal .res-roi-section-input-number").change(function () {
            setTotalTime("#portal-total", "#specification-menu-portal", ".res-roi-section-input-number")
        });

//        close spedify menu for email on fertig click
        $("#res-roi-button-portal-done").on('click', function () {
            CloseSpecifyMenu("#specification-menu-portal", "#res-roi-button-next", "#res-roi-button-previous", "#Workload_Portal", ".res-roi-section-input-number");
        });

//        update total percentage of medium percentage on value change
        $("#medium-percentage-container .res-roi-section-input-number").change(function () {
            setPercentageTotal("#percentage-total", "#medium-percentage-container", ".res-roi-section-input-number");
            percentageValidation("#percentage-total", "#medium-percentage-container", ".res-roi-section-input-number");
        });

//         update total percentage of wrong pickups percentage on value change
        $("#reasons-wrong-pickups-percentage-container .res-roi-section-input-number").change(function () {
            setPercentageTotal("#FalseRide_Reason_Total", "#reasons-wrong-pickups-percentage-container", ".res-roi-section-input-number");
            percentageValidation("#FalseRide_Reason_Total", "#reasons-wrong-pickups-percentage-container", ".res-roi-section-input-number");
        });

        //        ****App specify Menu ***

//        open specify menu on focus
        $("#res-roi-app-adjust-button").click(function () {
            if ($("[name=ItCosts_App_Status]:checked").val() === "false") {
                return;
            }
            OpenSpecifyMenu("#specification-menu-app-features", "#res-roi-button-next", "#res-roi-button-previous");
        });


        $("#res-roi-button-app-done").on('click', function () {
            CloseSpecifyMenu("#specification-menu-app-features", "#res-roi-button-next", "#res-roi-button-previous", "", "");
        });

        //jump to specify menu email when tab pressed on eigensportal percentage

        //jump to specify menu phone when tab pressed on email other
        controllTabSubMenuLast("#Workload_Mail_Other", "#Workload_Phone_Accept", "#specification-menu-phone", "#res-roi-button-next", "#res-roi-button-previous", "#Workload_Mail", ".res-roi-section-input-number");

        //jump to specify menu phone when tab pressed on email other
        controllTabSubMenuLast("#Workload_Phone_Other", "#Workload_Fax_Recieve", "#specification-menu-fax", "#res-roi-button-next", "#res-roi-button-previous", "#Workload_Phone", ".res-roi-section-input-number");

        //jump to specify menu phone when tab pressed on email other
        controllTabSubMenuLast("#Workload_Fax_Other", "#Workload_Portal_Open", "#specification-menu-portal", "#res-roi-button-next", "#res-roi-button-previous", "#Workload_Fax", ".res-roi-section-input-number");

        controllTabSubMenuLast("#Workload_Portal_Other", "#Orders_Week", "#specification-menu-portal", "#res-roi-button-next", "#res-roi-button-previous", "#Workload_Fax", ".res-roi-section-input-number");


        //disable tab
        disableTab('#Percentage_Portal');

        //diable textboxes if radio button is false
        $('input[type=radio][name=CustomerSatisfaction_GewAbfV_Status]').change(function () {
            if ($("[name=CustomerSatisfaction_GewAbfV_Status]:checked").val() === "true") {
                $("#CustomerSatisfaction_GewAbfV_Time").prop("readonly", false);
            }
            else {
                $("#CustomerSatisfaction_GewAbfV_Time").prop("readonly", true);
            }

        });

        $('input[type=radio][name=ItCosts_Portal_Status]').change(function () {
            if ($("[name=ItCosts_Portal_Status]:checked").val() === "true") {
                $("#ItCosts_Portal_Cost").prop("readonly", false);
            }
            else {
                $("#ItCosts_Portal_Cost").prop("readonly", true);
            }

        });

    });
}

//Jump to specific field on tab

function disableTab(OriginID) {
    $(OriginID).on('keydown', function (e) {
        if (e.keyCode == 9) e.preventDefault();
    });
}

function controllTabSubMenuLast(OriginID, TargetID, ContainerIDClose, ElementOne, ElementTwo, OutputFieldClass, InputFieldClasses) {
    $(OriginID).on('keydown', function (e) {
        if (e.keyCode == 9) e.preventDefault();
    });
    $(OriginID).keydown(function (event) {
        if (event.which === 9) {
            CloseSpecifyMenu(ContainerIDClose, ElementOne, ElementTwo, OutputFieldClass, InputFieldClasses);
        }
    });
}

//creating slider inputs
function createSliders() {
    $(document).ready(function () {
        $("#CustomerSatisfaction_WaitLoop_Slider").slider({
            min: 0,
            max: 100,
            value: 20,
            step: 5,
            slide: function () {
                setSliderValueOutputPercent("#CustomerSatisfaction_WaitLoop", "#CustomerSatisfaction_WaitLoop_Slider");
            },
            change: function () {
                setSliderValueOutputCustomer("#CustomerSatisfaction_CustomerAmount", "#CustomerSatisfaction_CustomerAmount_Slider");
            }
        })
        setSliderValueOutputPercent("#CustomerSatisfaction_WaitLoop", "#CustomerSatisfaction_WaitLoop_Slider");
    })

    $(document).ready(function () {
        $("#CustomerSatisfaction_CustomerAmount_Slider").slider({
            min: 100,
            max: 5100,
            value: 1000,
            step: 100,
            slide: function () {
                setSliderValueOutputCustomer("#CustomerSatisfaction_CustomerAmount", "#CustomerSatisfaction_CustomerAmount_Slider");
            },
            change: function () {
                setSliderValueOutputCustomer("#CustomerSatisfaction_CustomerAmount", "#CustomerSatisfaction_CustomerAmount_Slider");
            }
        })
        setSliderValueOutputCustomer("#CustomerSatisfaction_CustomerAmount", "#CustomerSatisfaction_CustomerAmount_Slider");
    })

    $(document).ready(function () {
        $("#CustomerSatisfaction_EasyOrder_Slider").slider({
            min: 0,
            max: 100,
            value: 50,
            step: 5,
            slide: function () {
                setSliderValueOutputPercent("#CustomerSatisfaction_EasyOrder", "#CustomerSatisfaction_EasyOrder_Slider", "#specification-menu-email", "#res-roi-button-next", "#res-roi-button-previous");
            },
            change: function () {
                setSliderValueOutputPercent("#CustomerSatisfaction_EasyOrder", "#CustomerSatisfaction_EasyOrder_Slider", "#specification-menu-email", "#res-roi-button-next", "#res-roi-button-previous");
            }
        })
        setSliderValueOutputPercent("#CustomerSatisfaction_EasyOrder", "#CustomerSatisfaction_EasyOrder_Slider", "#specification-menu-email", "#res-roi-button-next", "#res-roi-button-previous");
    })
}

function setSliderValueOutputPercent(TargetID, SliderID) {
    $(TargetID).val($(SliderID).slider("value") + "%");
}

function setSliderValueOutputCustomer(TargetID, SliderID) {
    let val = $(SliderID).slider("value");
    let customers;
    if (val > 4999) {
        customers = "5000+"
    }
    else {
        customers = val;
    }
    $(TargetID).val(customers);
}

//open specify menu
function OpenSpecifyMenu(ContainerID, HideElementOne, HideElementTwo) {
    $(ContainerID).css("position", "inherit");
    $(ContainerID).css("bottom", "0");

//    hiding buttons
    $(HideElementOne).css("visibility", "hidden");
    $(HideElementTwo).css("visibility", "hidden");
}

//close specify menu
function CloseSpecifyMenu(ContainerID, ShowElementOne, ShowElementTwo, TargetID, InputFieldClasses) {

    $(ContainerID).css("position", "absolute");
    $(ContainerID).css("bottom", "-10000px");
//    hiding buttons
    $(ShowElementOne).css("visibility", "visible");
    $(ShowElementTwo).css("visibility", "visible");
    setTotalTime(TargetID, ContainerID, InputFieldClasses);
}


function sumOfValues(ContainerID, InputFieldClasses) {
    let sum = 0;
    let val = 0;
    let selector = ContainerID + " " + InputFieldClasses;
    $(selector).each(function (element) {
        val = parseInt($(this).val());
        if (isNaN(val)) {
            val = 0;
        }
        sum = sum + val;
    });
    return sum;
}

function setTotalTime(TargetID, ContainerID, InputFieldClasses) {
    $(TargetID).val(secondsTimeSpanToMS(sumOfValues(ContainerID, InputFieldClasses)));
}

function secondsToHoursAndMinutes(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins;
    return ret;
}

function secondsTimeSpanToMS(s) {
    let zero = 0;
    let h = Math.floor(s / 3600); //Get whole hours
    s -= h * 3600;
    let m = Math.floor(s / 60); //Get remaining minutes
    s -= m * 60;
    if (s < 10) {
        zero = 0;
    }
    else {
        zero = "";
    }

    return m + ":" + zero + s //zero padding on minutes and seconds
}

function setPercentageTotal(TargetID, ContainerID, InputFieldClasses) {
    let Target = ContainerID + " " + TargetID;
    $(Target).val(sumOfValues(ContainerID, InputFieldClasses) + "%");
}

function setFalseRide_Amount(TargetID) {
    let constants = resRoiConstants();
    let data = collectingData();

    let val = data.Orders_Week * constants.percentageFalseTrips;
    $(TargetID).val(val);
}

function percentageValidation(TargetID, ContainerID, InputFieldClasses) {
    let Target = ContainerID + " " + TargetID;
    if (sumOfValues(ContainerID, InputFieldClasses) !== 100) {
        $(Target).css("border-color", "red");
        return false;
    }
    else {
        $(Target).css("border-color", "inherit");
        return true;
    }
}


function currentscreen() {
    return $("#res-roi-wizard").steps("getCurrentIndex");
}

function currentClass(containerIDNameWithoutNumber) {
    let currentClass;
    switch (currentscreen()) {
        case 0:
            currentClass = containerIDNameWithoutNumber + "0";
            break;
        case 1:
            currentClass = containerIDNameWithoutNumber + "1";
            break;
        case 2:
            currentClass = containerIDNameWithoutNumber + "2";
            break;
        case 3:
            currentClass = containerIDNameWithoutNumber + "3";
            break;
        case 4:
            currentClass = containerIDNameWithoutNumber + "3";
            break;
        case 5:
            currentClass = containerIDNameWithoutNumber + "3";
            break;
        default:
            alert("Leider ist ein Fahler aufgetreten, bitte laden Sie die Seite neu.")
    }
    return (currentClass);
}

function checkIfInputIsSet(containerIDNameWithoutNumber, inputElementClass) {
    if (developement) return true;
    let Inputfields = currentClass(containerIDNameWithoutNumber) + " " + inputElementClass;
    let status = true;
    $(Inputfields).each(function () {
        if ($(this).val().length <= 0) {
            status = false;
        }
    });
    return status === true;
}

function validatingPercentageBeforeNext(containerIDNameWithoutNumber, percentageContainer, inputElementClass, erorElementClass) {
    percentageFields = currentClass(containerIDNameWithoutNumber) + " " + percentageContainer;
    errorField = currentClass(containerIDNameWithoutNumber) + " " + erorElementClass;
    let sum = sumOfValues(percentageFields, inputElementClass);
    if(sum === 100 || $(percentageFields).attr('class') === undefined){$(errorField).css("display", "none")}else{$(errorField).css("display", "inherit")}
    return sum === 100 || $(percentageFields).attr('class') === undefined;
}

function GoNext(containerIDNameWithoutNumber, inputElementClass, percentageContainer, HideElementOne, HideElementTwo, totalSteps, errorElementClass) {
    makePost();
    if (checkIfInputIsSet(containerIDNameWithoutNumber, inputElementClass) && validatingPercentageBeforeNext(containerIDNameWithoutNumber, percentageContainer, inputElementClass, errorElementClass)) {
        setFalseRide_Amount("#FalseRide_Amount");
        $("#res-roi-wizard").steps("next");
        if (currentscreen() === totalSteps) {
            $(HideElementOne).css("visibility", "hidden");
            $(HideElementTwo).css("visibility", "hidden");

        }
    }
    else {
        if (!validatingPercentageBeforeNext(containerIDNameWithoutNumber, percentageContainer, inputElementClass));
    }

}

function StartRoi(containerIDNameWithoutNumber, ShowElementOne, ShowElementTwo) {
    makePost();
    $("#res-roi-wizard").steps("next");
    $(ShowElementOne).css("visibility", "visible");
    $(ShowElementTwo).css("visibility", "visible");
}

function GoPrevious(HideElementOne, HideElementTwo, ShowElementOne) {

    $("#res-roi-wizard").steps("previous");
    if (currentscreen() === 0) {
        $(HideElementOne).css("visibility", "hidden");
        $(HideElementTwo).css("visibility", "hidden");
        $(ShowElementOne).css("visibility", "inherit");

    }

}

function updateEvaluationText() {
    let results = calculationResults() ;
    let text = "Fertig! Digitales Auftragsmanagement hat für Sie folgende Vorteile: Sie können Verwaltungskosten in Höhe von "+ Math.round(results.AdminCostSaved)+ " EUR  im Monat einsparen sowie   "+ results.FalseRidesCostSaved*4 +" EUR durch weniger Fehlfahrten. ";
    return text;
}

function collectingData() {

    var formData = {};

    let hssc = getCookie("__hssc");
    if (hssc === "") {
        hssc = "not found"
    }
    formData["hssc"] = hssc;

    let hubspotutk = getCookie("hubspotutk");
    if (hubspotutk === "") {
        hubspotutk = "not found"
    }

    formData["hubspotutk"] = hubspotutk;

    formData["ErpSystem"] = $('#ErpSystem').val();

    //let currentScreen = currentscreen();
    //formData["General_Step"] = currentScreen;

    $(".res-roi-input-all").each(function () {
        let name = $(this).attr('id');
        let val = $(this).val();
        formData[name] = val;
    });

    $(".res-roi-section-input-checkbox-checkbox").each(function () {
        let name = $(this).attr('name');
        let val;
        val = !!$(this).is(':checked');


        if (val) {
            val = 1;
        } else (val = 0);

        if ($(this).is(':radio')) {
            let radio = "input[name=" + name + "]:checked";
            val = $(radio).val();
            if (val === "true") {
                val = 1
            } else {
                val = 0
            }
            ;
        }

        formData[name] = val;
    });

    return formData;
}

function resRoiConstants() {
    let constants = {
        "reducedFalseRideWrongContainer": 0.5,
        "reducedFalseRideWrongContainerContainerNotAccesible": 0.5,
        "percentageFalseTrips": 0.02,
        "ItCosts_App": {
            "ItCosts_App_API": 10000,
            "ItCosts_App_Android": 10000,
            "ItCosts_App_Containershop": 10000,
            "ItCosts_App_Documentation": 10000,
            "ItCosts_App_IOS": 10000,
            "ItCosts_App_Multilocation": 10000,
            "ItCosts_App_OrderStatus": 10000,
            "ItCosts_App_Other": 10000,
            "ItCosts_App_Pickup": 10000,
            "ItCosts_App_Pushnotification": 10000,
            "ItCosts_App_Status": 10000,
            "ItCosts_App_Webapp": 10000,
        }
    };
    return constants;
}

function calculationResults() {
    let results = {};

    results["AdminTimeSaved"] = secondsToHoursAndMinutes(timeSavingsAdmin());
    results["AdminCostSaved"] = secondsToMoney(timeSavingsAdmin());
    results["FalseRidesCostSaved"] = costSavingFalseRides();
    results["timeSavedGewAbf"] = timeSavingsCustomerSatisfactionGewAbf();
    results["DevelopementCostSaved"] = developementCostSavingItCost();
    results["FalseRidesSaved"] = savedFalseRides();
    results["FalseRidesSavedCost"] = savedFalseRidesCost();
    return results;
}

function timeSavingsAdmin() {
    let formData = collectingData();
    timeMail = (formData.Orders_Week * (formData.Percentage_Mail / 100)) * sumOfValues("#specification-menu-email", ".res-roi-section-input-number");
    timePhone = (formData.Orders_Week * (formData.Percentage_Phone / 100)) * sumOfValues("#specification-menu-phone", ".res-roi-section-input-number");
    timeFax = (formData.Orders_Week * (formData.Percentage_Fax / 100)) * sumOfValues("#specification-menu-fax", ".res-roi-section-input-number");
    timePortal = (formData.Orders_Week * (formData.Percentage_Portal / 100)) * sumOfValues("#specification-menu-portal", ".res-roi-section-input-number");
    totaltime = (timePhone + timeMail + timeFax + timePortal);
    return totaltime;
}

function hoursToMoney(hours) {
    let formData =  collectingData();
    return formData.Cost_Depsoition/11/40 * hours ;
}


function secondsToMoney(seconds) {
    let formData =  collectingData();
    return formData.Cost_Depsoition/11/40 * seconds/60/60 ;
}

function costSavingFalseRides() {
    let constant = resRoiConstants();
    let formData = collectingData();

    let WrongContainerReducedFalseRides = formData.FalseRide_Amount * (formData.FalseRide_Reason_WrongContainer / 100) * constant.reducedFalseRideWrongContainer;
    let NotAccesibleFalseRides = formData.FalseRide_Amount * (formData.FalseRide_Reason_ContainerNotAccesible / 100) * constant.reducedFalseRideWrongContainerContainerNotAccesible;

    let TotalFalseRidesSaved = WrongContainerReducedFalseRides + NotAccesibleFalseRides;

    let totalMoneySaved = TotalFalseRidesSaved * formData.FalseRide_Cost;

    return totalMoneySaved;
}

function timeSavingsCustomerSatisfactionGewAbf() {
    let formData = collectingData();
    if (formData.CustomerSatisfaction_GewAbfV_Status === 1) {
        return formData.CustomerSatisfaction_GewAbfV_Time * formData.CustomerSatisfaction_CustomerAmount;
    } else {
        return (0);
    }
}

function developementCostSavingItCost() {
    let formData = collectingData();
    let constant = resRoiConstants();
    let cost = 0;
    if (formData.CustomerSatisfaction_GewAbfV_Status === 1) {
        for (x in constant.ItCosts_App) {
            if (formData[x] === 1) {
                cost += constant.ItCosts_App[x];
            }
        }
        return cost;
    }

}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function customersLost() {
    let formData = collectingData();


}

function savedFalseRides() {
    let formData = collectingData();
    let constant = resRoiConstants();

    return formData.Orders_Week * constant.percentageFalseTrips;
}

function savedFalseRidesCost() {
    let data = collectingData();
    let constant = resRoiConstants();
    return data.Orders_Week * constant.percentageFalseTrips * data.FalseRide_Cost;
}

function makePost() {
    let formData = collectingData();

    $.ajax({
        type: "POST",
        url: wpa_data.admin_ajax,
        dataType: "json",
        data: {
            "action": "save_data",
            "formdata": formData,
        },
        success: function () {
            //get permalink for post from php and go to it
        }
    });

}



function validateEmail() {
    let formData = collectingData();
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(formData.Customer_Mail);
}


function sendMail() {
    let formData = collectingData();
    let results = calculationResults();

    $.ajax({
        type: "POST",
        url: wpa_data.admin_ajax,
        dataType: "json",
        data: {
            "action": "send_mail",
            "formdata": formData,
            "results": results,
        },
        success: function () {
        }
    });



}