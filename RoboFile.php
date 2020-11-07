<?php
/**
 * This is project's console command configuration for 
 * Robo task runner.
 * @see http:L//robo.li
 */

 class RoboFile Extends \Robo\Tasks
 {
     // define public method as commands
     public function dev()
     {
        $this->_exec("cd web && yarn start");
        $this->_exec("cd api && yarn start");
     }
 }