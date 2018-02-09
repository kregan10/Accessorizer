<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Info extends Application
{

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/
	 * 	- or -
	 * 		http://example.com/welcome/index
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		echo json_encode(array("scenario" => "PUBG Kit Selecter"));
	}

	/**
	 * @param  PK of category
	 * @return Specific category || all categories
	 */
	public function category($key = null)
	{
		// Check if key passed
		if ($key === null) {
			echo json_encode($this->categories->all());
		} else {
			echo json_encode($this->categories->get($key));
		}
	}

	/**
	 * @param  PK of accessory
	 * @return Specific accessory || all accessories
	 */
	public function catalog($key = null)
	{
		// Check if key passed
		if ($key === null) {

		} else {

		}
	}

	/**
	 * @param  PK of set
	 * @return Specific set || all Sets
	 */
	public function bundle($key = null)
	{
		// Check if key passed
		if ($key === null) {

		} else {

		}
	}
}