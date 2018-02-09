<?php

class Catalog extends Application
{

	/**
	 * Index page.
	 */
	public function index()
	{
		$this->data['pagebody'] = 'catalog';
		$this->data['pagetitle'] = 'Accessorize Soldier!';
		$this->render();
	}

}
