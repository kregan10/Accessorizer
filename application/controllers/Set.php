<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Set extends Application
{

	/**
	 * Index page.
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
		$this->data['categories'] = $categories;
		$this->data['sets'] = $sets;
		$this->data['pagebody'] = 'set';
		$this->data['pagetitle'] = 'Accessorize Soldier!';
		$this->render();
	}

	public function save_set() {
	
	$input_from_form = $this->input->post();

	$formData = array(
		'weapon' => $this->input->post('weapon'),
		'head' => $this->input->post('head'),
		'accessory' => $this->input->post('accessory'),
		'chest' => $this->input->post('chest'),
		'set_name' => $this->input->post('set'),
	);

	
	//need to open Accessories.csv, and match up the name to to id
	// Set: id,name,weapon,head,chest,accessory

	$newSetName = $formData['set_name'];
	$newWeaponId = "";
	$newHeadId = "";
	$newChestId = "";
	$newAccessoryId = "";

	// Assigning id's to their respective values in the csv file
	if (($handle = fopen("../data/Accessories.csv", "r")) !== FALSE) {
		while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
				$num = count($data);
				if (strcmp($data[1], $formData["weapon"]) == 0) {
					$newWeaponId = $data[0];
				}
				if (strcmp($data[1], $formData["head"]) == 0) {
					$newHeadId = $data[0];
				}
				if (strcmp($data[1], $formData["accessory"]) == 0) {
					$newAccessoryId = $data[0];
				}
				if (strcmp($data[1], $formData["chest"]) == 0) {
					$newChestId = $data[0];
				}
		}
		fclose($handle);
	}

	echo "Who am I? ";
	echo exec('whoami');
	$newID = -1;
	if (($handle = fopen("../data/Sets.csv", "r+")) !== FALSE) {
		while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
				$num = count($data);
				$newID++;
				for ($c=0; $c < $num; $c++) {
						echo $data[$c] . "<br />\n";
				}
		}
	}

		$newSet = array (
		"$newID,$newSetName,$newWeaponId,$newHeadId,$newAccessoryId"
		);

		foreach ($newSet as $line) {
			echo "Putting in $line";
			fputcsv($handle,explode(',',$line));
		}
		fclose($handle);


	// 		redirect('/set'); 
}

	public function add()
	{
    $set = $this->sets->create();
    $this->session->set_userdata('set', $set);
    $this->showit();
	}


}