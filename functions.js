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
        stepsContainerTag: "res-roi-section-steps-container",

    });
});

//hiding exsiting documents
function modifyWizard() {
    $(document).ready(function () {
        $(".actions").remove();

        $("#res-roi-button-previous").click(function () {
            $("#res-roi-wizard").steps("previous");
        });

        $("#res-roi-button-next").click(function () {
            $("#res-roi-wizard").steps("next");
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
            setPercentageTotal("#percentage-total", "#medium-percentage-container", ".res-roi-section-input-number")
            percentageValidation("#percentage-total", "#medium-percentage-container", ".res-roi-section-input-number");
        });

//         update total percentage of wrong pickups percentage on value change
        $("#reasons-wrong-pickups-percentage-container .res-roi-section-input-number").change(function () {
            setPercentageTotal("#reasons-wrong-pickups-total", "#reasons-wrong-pickups-percentage-container", ".res-roi-section-input-number");
            percentageValidation("#reasons-wrong-pickups-total", "#reasons-wrong-pickups-percentage-container", ".res-roi-section-input-number");
            console.log("1");
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
                setSliderValueOutputPercent("#amount-customers-easy-order-value", "#amount-customers-easy-order-slider");
            }
        });
    });
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
    var sum = 0;
    var val = 0;
    var selector = ContainerID + " " + InputFieldClasses;
    $(selector).each(function (element) {
        val = parseInt($(this).val());
        if (isNaN(val)) {
            val = 0;
        }
        ;
        sum = sum + val;
    });
    return sum;
}

function setTotalTime(TargetID, ContainerID, InputFieldClasses) {
    $(TargetID).val(secondsTimeSpanToMS(sumOfValues(ContainerID, InputFieldClasses)));
}

function secondsTimeSpanToMS(s) {
    var h = Math.floor(s / 3600); //Get whole hours
    s -= h * 3600;
    var m = Math.floor(s / 60); //Get remaining minutes
    s -= m * 60;
    if(s<10){
        var zero = 0;
    }
    else{
        var zero = "";
    }
    
    return m + ":" + zero + s //zero padding on minutes and seconds
}

function setPercentageTotal(TargetID, ContainerID, InputFieldClasses){
    var Target = ContainerID + " " + TargetID;
    $(Target).val(sumOfValues(ContainerID, InputFieldClasses)+"%");
}

function percentageValidation(TargetID, ContainerID, InputFieldClasses){
    var Target = ContainerID + " " + TargetID;
    if(sumOfValues(ContainerID, InputFieldClasses)!==100){
       $(Target).css("border-color", "red");
        return false;
       }
    else{
        $(Target).css("border-color", "inherit");
        return true;
    }
}


//Getting value of text field on change
function collectingData(){
    $(".res-roi-input-all").focusout(function () {
        console.log(($(this).attr('id')));
        console.log(($(this).val()));
    });
}
