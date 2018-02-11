<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends Application
{

	function __construct()
	{
		parent::__construct();
	}

	/**
	 * Homepage for our app
	 */
	public function index()
	{
		// this is the view we want shown
        $categories = $this->categories->all();
        $this->data['categories'] = $categories;
		$this->data['pagebody'] = 'homepage';
		$this->data['pagetitle'] = 'Choose your preset';
		$this->render();
	}

}
