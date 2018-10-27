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
register_deactivation_hook( __FILE__, 'my_plugin_remove_database' );
//register_uninstall_hook( __FILE__, array( 'Akismet', 'plugin_deactivation' ) );

function plugin_activate() {
    echo("Plugin was activated");
    roiInstall();
}


function roiInstall(){
    global $wpdb;
    $table_name = $wpdb->prefix . "roi_data";

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
      id mediumint(9) NOT NULL AUTO_INCREMENT,
      time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
      SessionID mediumint NOT NULL,
      UserIP mediumint NOT NULL,
      Finished tinyint(1) NOT NULL,
      Orders_Week mediumint NULL,
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
      Workload_Fax_Confirmd mediumint NULL,
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
      CustomerSatisfaction_GewAbfV_Status tinyint(1) NULL,
      CustomerSatisfaction_GewAbfV_Time mediumint NULL,
      ItCosts_App mediumint NULL,
      ItCosts_App_Pickup tinyint(1) NULL,
      ItCosts_App_Multilocation tinyint(1) NULL,
      ItCosts_App_Documentation tinyint(1) NULL,
      ItCosts_App_Containershop tinyint(1) NULL,
      ItCosts_App_Pushnotification tinyint(1) NULL,
      ItCosts_App_OrderStatus tinyint(1) NULL,
      ItCosts_App_Status tinyint(1) NULL,
      ItCosts_App_Webapp tinyint(1) NULL,
      ItCosts_App_IOS tinyint(1) NULL,
      ItCosts_App_Android tinyint(1) NULL,
      ItCosts_App_Other tinyint(1) NULL,
      ItCosts_App_Other_Value tinyint(1) NULL,
      ItCosts_Portal tinyint(1) NULL,
      ItCosts_Portal_Cost tinyint(1) NULL,
      Customer_Mail varchar(200) NULL,
      Customer_Name varchar(200) NULL,
      Customer_Phone varchar(200) NULL,      
      PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );

         $welcome_name = 'Mr. WordPress';
         $welcome_text = 'Congratulations, you just completed the installation!';

             $table_name = $wpdb->prefix . 'roi_data';

             $wpdb->insert(
             	$table_name,
             	array(
             		'time' => current_time( 'mysql' ),
             		'name' => $welcome_name,
             		'text' => $welcome_text,
             	)
             );

}

function postData(){


}
