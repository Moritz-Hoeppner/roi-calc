var developement = true;

function setup(){
    modifyWizard();
    settingEventListeners();
    createSliders();

    $(document).ready(function(){
        setTotalTime("#email-total", "#specification-menu-email", ".res-roi-section-input-number");
        setTotalTime("#workload-email", "#specification-menu-email", ".res-roi-section-input-number");

        setTotalTime("#phone-total", "#specification-menu-phone", ".res-roi-section-input-number");
        setTotalTime("#workload-phone", "#specification-menu-phone", ".res-roi-section-input-number");

        setTotalTime("#fax-total", "#specification-menu-fax", ".res-roi-section-input-number");
        setTotalTime("#workload-fax", "#specification-menu-fax", ".res-roi-section-input-number");

        setTotalTime("#portal-total", "#specification-menu-portal", ".res-roi-section-input-number");
        setTotalTime("#workload-portal", "#specification-menu-portal", ".res-roi-section-input-number");

        setPercentageTotal("#percentage-total", "#medium-percentage-container", ".res-roi-section-input-number");
        setPercentageTotal("#reasons-wrong-pickups-total", "#reasons-wrong-pickups-percentage-container", ".res-roi-section-input-number");

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
            GoPrevious("#res-roi-wizard-p-",".res-roi-input-all", ".res-roi-percentage-input");
        });

        $("#res-roi-button-next").click(function () {
            GoNext("#res-roi-wizard-p-",".res-roi-input-all", ".res-roi-percentage-input", "#res-roi-button-next", "#res-roi-button-previous", 4)
        });

        //    adding steps header
        $("res-roi-section-steps-container").prepend("<div class=\"res-roi-steps-header\">Berechnen Sie Ihre Vorteile</div>")

    });
}

//adding event listeners
function settingEventListeners() {
    $(document).ready(function () {
//        ****Mail specify Menu ***
        
//        open specify menu on focus
        $("#workload-email").focus(function () {
            OpenSpecifyMenu("#specification-menu-email", "#res-roi-button-next", "#res-roi-button-previous");
        });

        //update Total Value of Time at the mail specification menu
        $("#specification-menu-email .res-roi-section-input-number").change(function () {
            setTotalTime("#email-total", "#specification-menu-email", ".res-roi-section-input-number");
        });

//        close spedify menu for email on fertig click
        $("#res-roi-button-mail-done").on('click', function () {
            CloseSpecifyMenu("#specification-menu-email", "#res-roi-button-next", "#res-roi-button-previous", "#workload-email", ".res-roi-section-input-number");
        });
        
//        ****Phone specify Menu ***
        
//        open specify menu on focus
        $("#workload-phone").focus(function () {
            console.log("hey");
            OpenSpecifyMenu("#specification-menu-phone", "#res-roi-button-next", "#res-roi-button-previous");
        });



        //update Total Value of Time at the mail specification menu
        $("#specification-menu-phone .res-roi-section-input-number").change(function () {
            setTotalTime("#phone-total", "#specification-menu-phone", ".res-roi-section-input-number")
        });

//        close spedify menu for email on fertig click
        $("#res-roi-button-phone-done").on('click', function () {
            CloseSpecifyMenu("#specification-menu-phone", "#res-roi-button-next", "#res-roi-button-previous", "#workload-phone", ".res-roi-section-input-number");
        });


        
 //        ****Fax specify Menu ***
        
//        open specify menu on focus
        $("#workload-fax").focus(function () {
            OpenSpecifyMenu("#specification-menu-fax", "#res-roi-button-next", "#res-roi-button-previous");
        });

        //update Total Value of Time at the mail specification menu
        $("#specification-menu-fax .res-roi-section-input-number").change(function () {
            setTotalTime("#fax-total", "#specification-menu-fax", ".res-roi-section-input-number")
        });

//        close spedify menu for email on fertig click
        $("#res-roi-button-fax-done").on('click', function () {
            CloseSpecifyMenu("#specification-menu-fax", "#res-roi-button-next", "#res-roi-button-previous", "#workload-fax", ".res-roi-section-input-number");
        });

 //        ****Portal specify Menu ***
        
//        open specify menu on focus
        $("#workload-portal").focus(function () {
            OpenSpecifyMenu("#specification-menu-portal", "#res-roi-button-next", "#res-roi-button-previous");
        });

        //update Total Value of Time at the mail specification menu
        $("#specification-menu-portal .res-roi-section-input-number").change(function () {
            setTotalTime("#portal-total", "#specification-menu-portal", ".res-roi-section-input-number")
        });

//        close spedify menu for email on fertig click
        $("#res-roi-button-portal-done").on('click', function () {
                        console.log("hi");
            CloseSpecifyMenu("#specification-menu-portal", "#res-roi-button-next", "#res-roi-button-previous", "#workload-portal", ".res-roi-section-input-number");
        });
    
//        update total percentage of medium percentage on value change
        $("#medium-percentage-container .res-roi-section-input-number").change(function () {
            setPercentageTotal("#percentage-total", "#medium-percentage-container", ".res-roi-section-input-number");
            percentageValidation("#percentage-total", "#medium-percentage-container", ".res-roi-section-input-number");
        });

//         update total percentage of wrong pickups percentage on value change
        $("#reasons-wrong-pickups-percentage-container .res-roi-section-input-number").change(function () {
            setPercentageTotal("#reasons-wrong-pickups-total", "#reasons-wrong-pickups-percentage-container", ".res-roi-section-input-number");
            percentageValidation("#reasons-wrong-pickups-total", "#reasons-wrong-pickups-percentage-container", ".res-roi-section-input-number");
            console.log("1");
        });

        //        ****App specify Menu ***

//        open specify menu on focus
     $("#res-roi-app-adjust-button").click(function () {
            OpenSpecifyMenu("#specification-menu-app-features", "#res-roi-button-next", "#res-roi-button-previous");
        });

        $("#res-roi-button-app-done").on('click', function () {
            CloseSpecifyMenu("#specification-menu-app-features", "#res-roi-button-next", "#res-roi-button-previous", "", "");
        });

        // set slider value
        $( "#amount-waiting-loop-slider" ).slider({
            slide: function() {
                setSliderValueOutputPercent("#amount-waiting-loop-value", "#amount-waiting-loop-slider");
            }
        });

        // set slider value
        $( "#amount-customers-slider" ).slider({
            slide: function() {
                setSliderValueOutputPercent("#amount-customers-value", "#amount-customers-slider");
            }
        });

        // set slider value
        $( "#amount-customers-easy-order-slider" ).slider({
            slide: function() {
                console.log("easy");
                setSliderValueOutputPercent("#amount-customers-easy-order-value", "#amount-customers-easy-order-slider", "#specification-menu-email", "#res-roi-button-next", "#res-roi-button-previous");
            }
        });

        //jump to specify menu email when tab pressed on eigensportal percentage
        controllTabSubMenu("#percentage-portal", "#email-open", "#specification-menu-email", "", "#res-roi-button-next", "#res-roi-button-previous", "", "");

    //jump to specify menu phone when tab pressed on email other
        controllTabSubMenu("#email-other", "#phone-accept", "#specification-menu-phone", "#specification-menu-email","#res-roi-button-next", "#res-roi-button-previous", "#workload-email", ".res-roi-section-input-number" );

        //jump to specify menu phone when tab pressed on email other
        controllTabSubMenu("#phone-other", "#fax-receive", "#specification-menu-fax", "#specification-menu-phone","#res-roi-button-next", "#res-roi-button-previous", "#workload-phone", ".res-roi-section-input-number");

        //jump to specify menu phone when tab pressed on email other
       controllTabSubMenu("#fax-other", "#portal-open", "#specification-menu-portal", "#specification-menu-fax","#res-roi-button-next", "#res-roi-button-previous", "#workload-fax", ".res-roi-section-input-number" );

        controllTabSubMenuLast("#portal-other", "#orders-week", "#specification-menu-portal","#res-roi-button-next", "#res-roi-button-previous", "#workload-fax", ".res-roi-section-input-number" );

    });
}

//Jump to specific field on tab
function controllTabSubMenu(OriginID, TargetID, ContainerIDOpen, ContainerIDClose, ElementOne, ElementTwo, OutputFieldClass, InputFieldClasses){
    $(OriginID).keydown(function (event) {
        if(event.which === 9){
            CloseSpecifyMenu(ContainerIDClose, ElementOne, ElementTwo, OutputFieldClass, InputFieldClasses);
            OpenSpecifyMenu(ContainerIDOpen, ElementOne, ElementTwo);
            console.log("Target ID: " +TargetID);
            //$(TargetID).focus();
        }
        else return "hi";
    })
}

function controllTabSubMenuLast(OriginID, TargetID, ContainerIDClose, ElementOne, ElementTwo, OutputFieldClass, InputFieldClasses){
    $(OriginID).keydown(function (event) {
        console.log(event.which);
        if(event.which === 9){
            CloseSpecifyMenu(ContainerIDClose, ElementOne, ElementTwo, OutputFieldClass, InputFieldClasses);
            //OpenSpecifyMenu(ContainerIDOpen, ElementOne, ElementTwo);
            $(TargetID).focus();
        }
    })
}

//creating slider inputs
function createSliders(){
    $(document).ready(function () {
        $( "#amount-waiting-loop-slider" ).slider();
        min: 0;
        max: 100;
        value: 10;
        step: 5
    });

    $(document).ready(function () {
        $( "#amount-customers-slider" ).slider();
        min: 0;
        max: 100;
        value: 10;
        step: 5
    });

    $(document).ready(function () {
        $( "#amount-customers-easy-order-slider" ).slider();
        min: 0;
        max: 100;
        value: 10;
        step: 5
    });
}

function setSliderValueOutputPercent(TargetID, SliderID){
    $(TargetID).val($(SliderID).slider("value") + "%");
}

function setSliderValue(SourceID, SliderID){
    $(SliderID).slider( "value", $(SourceID).val() );
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
    $(ContainerID).css("bottom", "-10000");
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
    console.log("sum:" + sum);
    return sum;
}

function setTotalTime(TargetID, ContainerID, InputFieldClasses) {
    $(TargetID).val(secondsTimeSpanToMS(sumOfValues(ContainerID, InputFieldClasses)));
}

function secondsTimeSpanToMS(s) {
    let zero = 0;
    let h = Math.floor(s / 3600); //Get whole hours
    s -= h * 3600;
    let m = Math.floor(s / 60); //Get remaining minutes
    s -= m * 60;
    if(s<10){
         zero = 0;
    }
    else{
         zero = "";
    }
    
    return m + ":" + zero + s //zero padding on minutes and seconds
}

function setPercentageTotal(TargetID, ContainerID, InputFieldClasses){
    let Target = ContainerID + " " + TargetID;
    $(Target).val(sumOfValues(ContainerID, InputFieldClasses)+"%");
}

function percentageValidation(TargetID, ContainerID, InputFieldClasses){
    let Target = ContainerID + " " + TargetID;
    if(sumOfValues(ContainerID, InputFieldClasses)!==100){
       $(Target).css("border-color", "red");
        return false;
       }
    else{
        $(Target).css("border-color", "inherit");
        return true;
    }
}


function currentscreen(){
    let currentstep=$("#res-roi-wizard").steps("getCurrentIndex");
    console.log("current step: " + currentstep);
    return currentstep;
}

function currentClass(containerIDNameWithoutNumber){
    let currentClass;
    switch(currentscreen()){
        case 0:
            currentClass = containerIDNameWithoutNumber+"0";
            break;
        case 1:
            currentClass = containerIDNameWithoutNumber+"1";
            break;
        case 2:
            currentClass = containerIDNameWithoutNumber+"2";
            break;
        case 3:
            currentClass = containerIDNameWithoutNumber+"3";
            break;
        default:
            alert("We are sorry but something went wrong, please reload")
    }
    return(currentClass);
}

function checkIfInputIsSet(containerIDNameWithoutNumber, inputElementClass){
    if(developement) return true;
    let Inputfields = currentClass(containerIDNameWithoutNumber) + " " + inputElementClass;
    let status = true;
    console.log("status: " + status);
    $(Inputfields).each(function() {
        console.log($(this).val());

        if($(this).val().length <= 0) {status= false;}
    });
    return status === true;
}

function validatingPercentageBeforeNext(containerIDNameWithoutNumber, percentageContainer, inputElementClass) {
    percentageFields = currentClass(containerIDNameWithoutNumber) + " " + percentageContainer;
    let sum = sumOfValues(percentageFields, inputElementClass);
    console.log("class " + $(percentageFields).attr('class'));
    return sum === 100 || $(percentageFields).attr('class') === undefined;
}

function GoNext(containerIDNameWithoutNumber, inputElementClass, percentageContainer, HideElementOne, HideElementTwo, totalSteps){
    if(checkIfInputIsSet(containerIDNameWithoutNumber, inputElementClass) && validatingPercentageBeforeNext(containerIDNameWithoutNumber, percentageContainer, inputElementClass)){
        $("#res-roi-wizard").steps("next");
        if(currentscreen()===totalSteps){
            $(HideElementOne).css("visibility", "hidden");
            $(HideElementTwo).css("visibility", "hidden");

        }
    }
    else{
        if(!checkIfInputIsSet(containerIDNameWithoutNumber, inputElementClass)) alert("Please fill all fields");
        if(!validatingPercentageBeforeNext(containerIDNameWithoutNumber, percentageContainer, inputElementClass)) alert("Percent do not add up to 100%");
    }

}

function GoPrevious(HideElement){

    $("#res-roi-wizard").steps("previous");
    if(currentscreen()===0){ $(HideElement).css("visibility", "hidden");
    }

}

//Getting value of text field on change
function collectingData(){
    $(".res-roi-input-all").focusout(function () {
        console.log(($(this).attr('id')));
        console.log(($(this).val()));
    });
}


