<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class About extends Application
{

	/**
	 * Index page.
	 */
	public function index()
	{

    $this->data['pagebody'] = 'about';
		$this->data['pagetitle'] = 'About';
		$this->render();
	}

}
