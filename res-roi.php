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
    roi-install();
    postData();
}


function roi-install(){
    global $wpdb;
    $table_name = $wpdb->prefix . "roi_data";

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
      id mediumint(9) NOT NULL AUTO_INCREMENT,
      time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
      name tinytext NOT NULL,
      text text NOT NULL,
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
