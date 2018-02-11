<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Info extends Application
{

	/**
	 * Returns a description of your scenario
	 * Example: {"scenario":"Duckey player"}
	 *
	 * @return Specific scenario -
	 */
	public function index()
	{
		// Encode data as json.
		$data = json_encode(array("scenario" => "PUBG Kit Selecter"));

		// Set correct json/output request details.
		$this->output->set_content_type('application/json');
		$this->output->set_output($data);
	}

	/**
	 * Returns the designated category, or all of
	 * them if none is specifically requested.
	 *
	 * @param  PK of category
	 * @return Specific category || all categories
	 */
	public function category($key = null)
	{
		// Encode data as json.
		$data = json_encode($this->categories->get($key));

		// Check if specific category exists.
		if (is_null($key))
		{
			$data = json_encode($this->categories->all());
		}

		// Set correct json/output request details.
		$this->output->set_content_type('application/json');
		$this->output->set_output($data);
	}

	/**
	 * Returns the designated accessory, or all of
	 * them if none is specifically requested.
	 *
	 * @param  PK of accessory
	 * @return Specific accessory || all accessories
	 */
	public function catalog($key = null)
	{
		// Encode data as json.
		$data = json_encode($this->accessories->get($key));

		// Check if specific category exists.
		if (is_null($key))
		{
			$data = json_encode($this->accessories->all());
		}

		// Set correct json/output request details.
		$this->output->set_content_type('application/json');
		$this->output->set_output($data);
	}

	/**
	 * Returns the designated category, or all of
	 * them if none is specifically requested.
	 *
	 * @param  PK of set
	 * @return Specific set || all Sets
	 */
	public function bundle($key = null)
	{
		// Encode data as json.
		$data = json_encode($this->sets->get($key));

		// Check if specific category exists.
		if (is_null($key))
		{
			$data = json_encode($this->sets->all());
		}

		// Set correct json/output request details.
		$this->output->set_content_type('application/json');
		$this->output->set_output($data);
	}
}
