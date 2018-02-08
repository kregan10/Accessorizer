<?php
class Categories extends CSV_Model
{
    // categories Id
    public $id;
    // categories name
    public $name;
    // categories description
    public $description;

    /**
     * Contructor for Categories
     */
    function __construct()
    {
        parent::__construct(APPPATH . "../data/Categories.csv", "id", "categories");
    }
}
