<?php
/**
 * @package Akismet
 */
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
if ( !function_exists( 'add_action' ) ) {
	echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
	exit;
}

/*define( 'RES-ROI_VERSION', '1.0.0' );
define( 'RES-ROI__MINIMUM_WP_VERSION', '4.0' );
define( 'RES-ROI__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'RES-ROI_DELETE_LIMIT', 100000 );*/

register_activation_hook( 'res-roi/res-roi.php', 'plugin_activate' );
register_deactivation_hook( 'res-roi/res-roi.php', 'plugin_unistall' );
register_uninstall_hook('res-roi/res-roi.php' , 'plugin_unistall');

function plugin_activate() {
    roiCreateDatabase();
    postData();
}

function plugin_unistall(){
    roiDeleteDatabase();

}


function roiCreateDatabase(){
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

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );


}

function postData(){

    global $wpdb;
    $table_name = $wpdb->prefix . "roi_data";


    $wpdb->insert(
        $table_name,
        array(
            'time' => 'value1',
            'hubspotutk' => 1,
            'hssc' => 1,
            'UserIP' => 1,
            'stage' => 1,
            'Orders_Week' => 1,
            'Cost_Depsoition' => 1,
            'ErpSystem' => 1,
            'Percentage_Mail' => 1,
            'Percentage_Phone' => 1,
            'Percentage_Fax' => 1,
            'Percentage_Portal' => 1,
            'Workload_Mail_Open' => 1,
            'Workload_Mail_Read' => 1,
            'Workload_Mail_Process' => 1,
            'Workload_Mail_Confirm' => 1,
            'Workload_Mail_Other' => 1,
            'Workload_Mail_Other_Value' => 1,
            'Workload_Phone_Accept' => 1,
            'Workload_Phone_Process' => 1,
            'Workload_Phone_Confirm' => 1,
            'Workload_Phone_Other' => 1,
            'Workload_Phone_Other_Value' => 1,
            'Workload_Fax_Recieve' => 1,
            'Workload_Fax_Read' => 1,
            'Workload_Fax_Process' => 1,
            'Workload_Fax_Confirm' => 1,
            'Workload_Fax_Other' => 1,
            'Workload_Fax_Other_Value' => 1,
            'Workload_Portal_Open' => 1,
            'Workload_Portal_Process' => 1,
            'Workload_Portal_Other' => 1,
            'Workload_Portal_Other_Value' => 1,
            'FalseRide_Amount' => 1,
            'FalseRide_Cost' => 1,
            'FalseRide_Time' => 1,
            'FalseRide_Reason_WrongContainer' => 1,
            'FalseRide_Reason_ContainerNotAccesible' => 1,
            'FalseRide_Reason_Other' => 1,
            'FalseRide_Reason_Other_Value' => 1,
            'CustomerSatisfaction_WaitLoop' => 1,
            'CustomerSatisfaction_WaitLoop_NoData' => 1,
            'CustomerSatisfaction_EasyOrder' => 1,
            'CustomerSatisfaction_CustomerAmount' => 1,
            'CustomerSatisfaction_GewAbfV_Status' => 1,
            'CustomerSatisfaction_GewAbfV_Time' => 1,
            'ItCosts_App_Status' => 1,
            'ItCosts_App_FunkionAnpassenPressed' => 1,
            'ItCosts_App_Pickup' => 1,
            'ItCosts_App_Multilocation' => 1,
            'ItCosts_App_Containershop' => 1,
            'ItCosts_App_Pushnotification' => 1,
            'ItCosts_App_OrderStatus' => 1,
            'ItCosts_App_API' => 1,
            'ItCosts_App_Webapp' => 1,
            'ItCosts_App_IOS' => 1,
            'ItCosts_App_Android' => 1,
            'ItCosts_App_Other' => 1,
            'ItCosts_App_Other_Value' => 1,
            'ItCosts_Portal_Status' => 1,
            'ItCosts_Portal_Cost' => 1,
            'Customer_Mail' => 1,
            'Customer_Name' => 1,
            'ItCosts_Portal_Cost' => 1
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

function roiDeleteDatabase(){
    global $wpdb;
    $table_name = $wpdb->prefix . "roi_data";
    $sql = "DROP TABLE IF EXISTS $table_name";
    $wpdb->query($sql);
}

