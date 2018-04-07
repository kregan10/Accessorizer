<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Set extends Application
{

    /**
     * Index page.
     */
    public function index()
    {
        $set = $this->sets->create();
        $this->session->set_userdata('set', $set);

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

    public function save() {
        $this->load->library('form_validation');
        $this->form_validation->set_rules($this->sets->rules());

        $set = (array) $this->session->userdata('set');
        $set = array_merge($set, $this->input->post());
        
        $set = (object) $set;
        $this->session->set_userdata('set', (object) $set);

        if (!empty($set->name)) {
            $set->id = $this->sets->highest() + 1;
            
            if (!empty($set->weapon)) {
                $set->weapon = $this->accessories->some('accessoryName', $set->weapon)[0]->accessoryId;
            }

            if (!empty($set->head)) {
                $set->head = $this->accessories->some('accessoryName', $set->head)[0]->accessoryId;
            }
    
            if (!empty($set->chest)) {
                $set->chest = $this->accessories->some('accessoryName', $set->chest)[0]->accessoryId;
            }
    
            if (!empty($set->accessory)) {
                $set->accessory = $this->accessories->some('accessoryName', $set->accessory)[0]->accessoryId;
            }

            $this->sets->add($set);
        }
    }
}