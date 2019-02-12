<?php
/*
Plugin Name: ROI Calculator
Plugin URI: TODO
Description: ROI Calculator for Recyclers World Wide to see the benefits by using Resourcify-PRX
Version: 1.0.0
Author: Moritz Hoeppner
Author URI: TODO
License: GPLv2 or later
Text Domain: akismet
*/

/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

Copyright 2005-2018 Resourcify GmbH
*/

// Make sure we don't expose any info if called directly
if (!function_exists('add_action')) {
    echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
    exit;
}

/*define( 'RES-ROI_VERSION', '1.0.0' );
define( 'RES-ROI__MINIMUM_WP_VERSION', '4.0' );
define( 'RES-ROI__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'RES-ROI_DELETE_LIMIT', 100000 );*/

register_activation_hook('res-roi/res-roi.php', 'plugin_activate');
register_deactivation_hook('res-roi/res-roi.php', 'plugin_unistall');
register_uninstall_hook('res-roi/res-roi.php', 'plugin_unistall');
add_action('wp_enqueue_scripts', 'wpb_adding_scripts');

//add_action( 'wp_ajax_save_data', 'my_ajax_handler' );
//add_action( 'wp_ajax_nopriv_save_data', 'my_ajax_handler' );

add_action('wp_ajax_save_data', 'my_ajax_handler');
add_action('wp_ajax_nopriv_save_data', 'my_ajax_handler');

add_action('wp_ajax_send_mail', 'my_ajax_handler_mail');
add_action('wp_ajax_nopriv_send_mail', 'my_ajax_handler_mail');


function wpb_adding_scripts()
{

    wp_enqueue_script('jquery.js', plugins_url('jquery.js', __FILE__), '1.1', true);

    wp_enqueue_script('jquery-ui.js', plugins_url('jquery-ui-1.12.1/jquery-ui.js', __FILE__), '1.1', true);

    wp_enqueue_script('jquery.steps.js', plugins_url('jquery.steps-1.1.0/jquery.steps.js', __FILE__), '1.1', true);

    wp_enqueue_style('jquery-ui.min', plugins_url('jquery-ui-1.12.1/jquery-ui.min.css', __FILE__), true, '1.1');

    wp_enqueue_style('jquery.steps', plugins_url('css/jquery.steps.css', __FILE__), true, '1.1');

    wp_enqueue_style('main', plugins_url('css/main.css', __FILE__), true, '1.4');

    wp_enqueue_script('functions', plugins_url('functions.js', __FILE__), '1.5', true);

    $script_data = array(
        'admin_ajax' => admin_url('admin-ajax.php')
    );

    wp_localize_script(
        'functions',
        'wpa_data',
        $script_data
    );


}


//add_action( 'wp_ajax_my_tag_count', 'my_ajax_handler' );
//$title_nonce = wp_create_nonce( 'title_example' );

function my_ajax_handler()
{
    /* $title_nonce = wp_create_nonce( 'title_example' );
     check_ajax_referer( 'title_example' );*/

    $data = $_POST['formdata'];

    postData($data);


    wp_die(); // All ajax handlers die when finished
}


function my_ajax_handler_mail()
{
    /* $title_nonce = wp_create_nonce( 'title_example' );
     check_ajax_referer( 'title_example' );*/

    $data = $_POST['formdata'];
    $results = $_POST['results'];


    sendMail($data, $results);


    wp_die(); // All ajax handlers die when finished
}

function foobar_func($atts)
{
    $wizard = file_get_contents(plugins_url('wizard.html', __FILE__));
    return $wizard;
}

add_shortcode('res-roi-widged', 'foobar_func');


function plugin_activate()
{
    roiCreateDatabase();

}

function plugin_unistall()
{
    roiDeleteDatabase();
}


function roiCreateDatabase()
{
    global $wpdb;
    $table_name = $wpdb->prefix . "roi_data";

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
      id mediumint(9) NOT NULL AUTO_INCREMENT,
      time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
      hubspotutk varchar(200) NOT NULL,
      hssc varchar(200) NOT NULL,
      UserIP mediumint NOT NULL,
      General_Step tinyint NOT NULL,
      Orders_Week mediumint NULL,
      Cost_Depsoition mediumint NULL,
      ErpSystem varchar(200) NULL,
      Percentage_Mail tinyint NULL,
      Percentage_Phone tinyint NULL,
      Percentage_Fax tinyint NULL,
      Percentage_Portal tinyint NULL,
      Workload_Mail_Open mediumint NULL,
      Workload_Mail_Read mediumint NULL,
      Workload_Mail_Process mediumint NULL,
      Workload_Mail_Confirm mediumint NULL,
      Workload_Mail_Other mediumint NULL,
      Workload_Mail_Other_Value varchar(200) NULL,
      Workload_Phone_Accept mediumint NULL,
      Workload_Phone_Process mediumint NULL,
      Workload_Phone_Confirm mediumint NULL,
      Workload_Phone_Other mediumint NULL,
      Workload_Phone_Other_Value varchar(200) NULL,
      Workload_Fax_Recieve mediumint NULL,
      Workload_Fax_Read mediumint NULL,
      Workload_Fax_Process mediumint NULL,
      Workload_Fax_Confirm mediumint NULL,
      Workload_Fax_Other mediumint NULL,
      Workload_Fax_Other_Value  varchar(200) NULL,
      Workload_Portal_Open mediumint NULL,
      Workload_Portal_Process mediumint NULL,
      Workload_Portal_Other mediumint NULL,
      Workload_Portal_Other_Value varchar(200) NULL,
      FalseRide_Amount mediumint NULL,
      FalseRide_Cost mediumint NULL,
      FalseRide_Time mediumint NULL,
      FalseRide_Reason_WrongContainer tinyint NULL,
      FalseRide_Reason_ContainerNotAccesible tinyint NULL,
      FalseRide_Reason_Other tinyint NULL,
      FalseRide_Reason_Other_Value varchar(200) NULL,
      CustomerSatisfaction_WaitLoop mediumint NULL,
      CustomerSatisfaction_WaitLoop_NoData tinyint(1) NULL,
      CustomerSatisfaction_EasyOrder mediumint NULL,
      CustomerSatisfaction_CustomerAmount mediumint NULL,
      CustomerSatisfaction_GewAbfV_Status tinyint(1) NULL,
      CustomerSatisfaction_GewAbfV_Time mediumint NULL,
      ItCosts_App_Status mediumint NULL,
      ItCosts_App_FunkionAnpassenPressed tinyint(1) NULL,
      ItCosts_App_Pickup tinyint(1) NULL,
      ItCosts_App_Multilocation tinyint(1) NULL,
      ItCosts_App_Documentation tinyint(1) NULL,
      ItCosts_App_Containershop tinyint(1) NULL,
      ItCosts_App_Pushnotification tinyint(1) NULL,
      ItCosts_App_OrderStatus tinyint(1) NULL,
      ItCosts_App_API tinyint(1) NULL,
      ItCosts_App_Webapp tinyint(1) NULL,
      ItCosts_App_IOS tinyint(1) NULL,
      ItCosts_App_Android tinyint(1) NULL,
      ItCosts_App_Other tinyint(1) NULL,
      ItCosts_App_Other_Value tinyint(1) NULL,
      ItCosts_Portal_Status tinyint(1) NULL,
      ItCosts_Portal_Cost tinyint(1) NULL,
      Customer_Mail varchar(200) NULL,
      Customer_Name varchar(200) NULL,
      Customer_Phone varchar(200) NULL,      
      PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);


}

function postData($json)
{

    global $wpdb;
    $table_name = $wpdb->prefix . "roi_data";


    $wpdb->insert(
        $table_name,
        array(
            'hubspotutk' => $json['hubspotutk'],
            'hssc' => $json['hssc'],
            'UserIP' => '1',
            'General_Step' => '1',
            'Orders_Week' => $json['Orders_Week'],
            'Cost_Depsoition' => $json['Cost_Depsoition'],
            'ErpSystem' => $json['ErpSystem'],
            'Percentage_Mail' => $json['Percentage_Mail'],
            'Percentage_Phone' => $json['Percentage_Phone'],
            'Percentage_Fax' => $json['Percentage_Fax'],
            'Percentage_Portal' => $json['Percentage_Portal'],
            'Workload_Mail_Open' => $json['Workload_Mail_Open'],
            'Workload_Mail_Read' => $json['Workload_Mail_Read'],
            'Workload_Mail_Process' => $json['Workload_Mail_Process'],
            'Workload_Mail_Confirm' => $json['Workload_Mail_Confirm'],
            'Workload_Mail_Other' => $json['Workload_Mail_Other'],
            'Workload_Mail_Other_Value' => $json['Workload_Mail_Other_Value'],
            'Workload_Phone_Accept' => $json['Workload_Phone_Accept'],
            'Workload_Phone_Process' => $json['Workload_Phone_Process'],
            'Workload_Phone_Confirm' => $json['Workload_Phone_Confirm'],
            'Workload_Phone_Other' => $json['Workload_Phone_Other'],
            'Workload_Phone_Other_Value' => $json['Workload_Phone_Other_Value'],
            'Workload_Fax_Recieve' => $json['Workload_Fax_Recieve'],
            'Workload_Fax_Read' => $json['Workload_Fax_Read'],
            'Workload_Fax_Process' => $json['Workload_Fax_Process'],
            'Workload_Fax_Confirm' => $json['Workload_Fax_Confirm'],
            'Workload_Fax_Other' => $json['Workload_Fax_Other'],
            'Workload_Fax_Other_Value' => $json['Workload_Fax_Other_Value'],
            'Workload_Portal_Open' => $json['Workload_Portal_Open'],
            'Workload_Portal_Process' => $json['Workload_Portal_Process'],
            'Workload_Portal_Other' => $json['Workload_Portal_Other'],
            'Workload_Portal_Other_Value' => $json['Workload_Portal_Other_Value'],
            'FalseRide_Amount' => $json['FalseRide_Amount'],
            'FalseRide_Cost' => $json['FalseRide_Cost'],
            'FalseRide_Time' => $json['FalseRide_Time'],
            'FalseRide_Reason_WrongContainer' => $json['FalseRide_Reason_WrongContainer'],
            'FalseRide_Reason_ContainerNotAccesible' => $json['FalseRide_Reason_ContainerNotAccesible'],
            'FalseRide_Reason_Other' => $json['FalseRide_Reason_Other'],
            'FalseRide_Reason_Other_Value' => $json['FalseRide_Reason_Other_Value'],
            'CustomerSatisfaction_WaitLoop' => $json['CustomerSatisfaction_WaitLoop'],
            'CustomerSatisfaction_WaitLoop_NoData' => $json['CustomerSatisfaction_WaitLoop_NoData'],
            'CustomerSatisfaction_EasyOrder' => $json['CustomerSatisfaction_EasyOrder'],
            'CustomerSatisfaction_CustomerAmount' => $json['CustomerSatisfaction_CustomerAmount'],
            'CustomerSatisfaction_GewAbfV_Status' => $json['CustomerSatisfaction_GewAbfV_Status'],
            'CustomerSatisfaction_GewAbfV_Time' => $json['CustomerSatisfaction_GewAbfV_Time'],
            'ItCosts_App_Status' => $json['ItCosts_App_Status'],
            'ItCosts_App_FunkionAnpassenPressed' => $json['ItCosts_App_FunkionAnpassenPressed'],
            'ItCosts_App_Pickup' => $json['ItCosts_App_Pickup'],
            'ItCosts_App_Multilocation' => $json['ItCosts_App_Multilocation'],
            'ItCosts_App_Containershop' => $json['ItCosts_App_Containershop'],
            'ItCosts_App_Pushnotification' => $json['ItCosts_App_Pushnotification'],
            'ItCosts_App_OrderStatus' => $json['ItCosts_App_OrderStatus'],
            'ItCosts_App_API' => $json['ItCosts_App_API'],
            'ItCosts_App_Webapp' => $json['ItCosts_App_Webapp'],
            'ItCosts_App_IOS' => $json['ItCosts_App_IOS'],
            'ItCosts_App_Android' => $json['ItCosts_App_Android'],
            'ItCosts_App_Other' => $json['ItCosts_App_Other'],
            'ItCosts_App_Other_Value' => $json['ItCosts_App_Other_Value'],
            'ItCosts_Portal_Status' => $json['ItCosts_Portal_Status'],
            'ItCosts_Portal_Cost' => $json['ItCosts_Portal_Cost'],
            'Customer_Mail' => $json['Customer_Mail'],
            'Customer_Name' => $json['Customer_Name'],
            'Customer_Phone' => $json['Customer_Phone'],
            'ItCosts_Portal_Cost' => $json['ItCosts_Portal_Cost']
        ),
        array(
            '%s',   //time
            '%s',   //hubspotutk
            '%s',   //hssc
            '%s',   //UserIP
            '%d',   //stage
            '%d',   //Orders_Week
            '%d',   //Cost_Depsoition
            '%s',   //ErpSystem
            '%d',   //Percentage_Mail
            '%d',   //Percentage_Phone
            '%d',   //Percentage_Fax
            '%d',   //Percentage_Portal
            '%d',   //Workload_Mail_Open
            '%d',   //Workload_Mail_Read
            '%d',   //Workload_Mail_Process
            '%d',   //Workload_Mail_Confirm
            '%d',   //Workload_Mail_Other
            '%s',   //Workload_Mail_Other_Value
            '%d',   //Workload_Phone_Accept
            '%d',   //Workload_Phone_Process
            '%d',   //Workload_Phone_Confirm
            '%d',   //Workload_Phone_Other
            '%s',   //Workload_Phone_Other_Value
            '%d',   //Workload_Fax_Recieve
            '%d',   //Workload_Fax_Read
            '%d',   //Workload_Fax_Process
            '%d',   //Workload_Fax_Confirm
            '%d',   //Workload_Fax_Other
            '%s',   //Workload_Fax_Other_Value
            '%s',   //Workload_Portal_Open
            '%s',   //Workload_Portal_Process
            '%s',   //Workload_Portal_Other
            '%s',   //Workload_Portal_Other_Value
            '%d',   //FalseRide_Amount
            '%d',   //FalseRide_Cost
            '%d',   //FalseRide_Time
            '%d',   //FalseRide_Reason_WrongContainer
            '%d',   //FalseRide_Reason_ContainerNotAccesible
            '%d',   //FalseRide_Reason_Other
            '%s',   //FalseRide_Reason_Other_Value
            '%d',   //CustomerSatisfaction_WaitLoop
            '%d',   //CustomerSatisfaction_WaitLoop_NoData
            '%d',   //CustomerSatisfaction_EasyOrder
            '%d',   //CustomerSatisfaction_CustomerAmount
            '%d',   //CustomerSatisfaction_GewAbfV_Status
            '%d',   //CustomerSatisfaction_GewAbfV_Time
            '%d',   //ItCosts_App_Status
            '%d',   //ItCosts_App_FunkionAnpassenPressed
            '%d',   //ItCosts_App_Pickup
            '%d',   //ItCosts_App_Documentation
            '%d',   //ItCosts_App_Containershop
            '%d',   //ItCosts_App_Pushnotification
            '%d',   //ItCosts_App_OrderStatus
            '%d',   //ItCosts_App_API
            '%d',   //ItCosts_App_Webapp
            '%d',   //ItCosts_App_IOS
            '%d',   //ItCosts_App_Android
            '%d',   //ItCosts_App_Other
            '%s',   //ItCosts_App_Other_Value
            '%d',   //ItCosts_Portal_Status
            '%d',   //ItCosts_Portal_Cost
            '%s',   //Customer_Mail
            '%s',   //Customer_Name
            '%s',   //Customer_Phone

        )
    );

}

function roiDeleteDatabase($json)
{
    global $wpdb;
    $table_name = $wpdb->prefix . "roi_data";
    $sql = "DROP TABLE IF EXISTS $table_name";
    $wpdb->query($sql);
}

function sendMail($json, $results)
{

    $values = "
    <br><br>Here are the values to change in the PDF (in the current Version not all are needed):<br>" .
        "<br>Admin_Current_Time_Month: " . $results['Admin_Current_Time_Month'] .
        "<br>Admin_Current_Cost_Month: " . $results['Admin_Current_Cost_Month'] .
        "<br>Admin_Saved_Time_Month: " . $results['Admin_Saved_Time_Month'] .
        "<br>Admin_Saved_Cost_Month: " . $results['Admin_Saved_Cost_Month'] .
        "<br>FalseRides_Saved_Cost_Month: " . $results['FalseRides_Saved_Cost_Month'] .
        "<br>GewAbf_Saved_Time_Year: " . $results['GewAbf_Saved_Time_Year'] .
        "<br>FalseRides_Saved_Amount_Month: " . $results['FalseRides_Saved_Amount_Month'] .
        "<br>FalseRides_Saved_Amount_Year: " . $results['FalseRides_Saved_Amount_Year'] .
        "<br>Admin_Saved_Cost_Year: " . $results['Admin_Saved_Cost_Year'] .
        "<br>DevelopementCostSaved: " . $results['DevelopementCostSaved']."<br>".
        "<br>For Diagramm: <br>".
        "<br>Time_Mail_Week: " . $results['Time_Mail_Week']."<br>".
        "<br>Time_Phone_Week: " . $results['Time_Phone_Week']."<br>".
        "<br>Time_Fax_Week: " . $results['Time_Fax_Week']."<br>".
        "<br>Time_Portal_Week: " . $results['Time_Portal_Week']."<br>"
    ;
    $to = $json['Customer_Mail'];
    $subject = "Ihr Vorteil durch Resourcify";
    $txt = "Wir sind dabei Ihr ergebniss auszuwerten und werden uns demnächt mit Ihnen in Verbindung setzen. <br><br> Mit freundlichen Grüßen <br> Ihr Resourcify Team";
    $headers = "From: felix.heinricy@resourcify.de" . "\r\n" . 'Content-type: text/html; charset=utf8' . "\r\n";
    $message = $txt;

// Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "The email was sent.";
    } else {

        echo "There was an error sending the mail.";

    }

    $to = 'moritz.hoeppner@resourcify.de';
    $subject = "Ihr Vorteil durch Resourcify";
    $txt = 'ROI was filled by ' . $json['Customer_Name'] . '. Moritz will check the backend and is in charge of the further progress. <br> In case you think it might have been forgotten please remind the person in charge. <br> the customer mail is: ' . $json['Customer_Mail'] .$values;
    $headers = "From: roi@resourcify.de" . "\r\n" . 'Content-type: text/html; charset=utf8' . "\r\n";

    mail($to, $subject, $txt, $headers);

    $to = 'gary.lewis@resourcify.de';
    $subject = "Ihr Vorteil durch Resourcify";
    $txt = 'ROI was filled by '.$json['Customer_Name'].'. Moritz will check the backend and is in charge of the further progress. <br> In case you think it might have been forgotten please remind the person in charge. <br> the customer mail is: '.$json['Customer_Mail'].$values;
    $headers = "From: roi@resourcify.de" . "\r\n".'Content-type: text/html; charset=utf8' . "\r\n";

    mail($to,$subject,$txt,$headers);

}


/*s
function createPDF(){

    $url = 'https://pdf.mein-recycling.de/api/pdf/10';
    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, '{"CompanyName": "Pendula"}');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',)
    );

    $response = curl_exec($ch);
    curl_close($ch);

    echo  $response;
    return $response;


}

*/


//Library for converting html to pdf
