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
		$categories = $this->categories->all();
		foreach ($categories as $category) {
			$accessories = $this->accessories->some('categoryId', $category->categoryId);
			foreach ($accessories as $accessory) {
				$accessory->categoryName = $category->categoryName;
			}
			$category->accessories = $accessories;
		}
		
		$sets = $this->sets->all();
		
		$this->data['sets'] = $sets;
        $this->data['categories'] = $categories;
		$this->data['pagebody'] = 'homepage';
		$this->data['pagetitle'] = 'Choose your preset';

		$this->render();
	}

}
