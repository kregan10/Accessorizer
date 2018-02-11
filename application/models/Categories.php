<?php

class Categories extends CSV_Model
{
    // category Id
    public $categoryId;
    // category name
    public $categoryName;
    // category description
    public $description;
    // list of accessories
    public $accessories;

    /**
     * Contructor for Categories
     */
    function __construct()
    {
        parent::__construct(APPPATH . "../data/Categories.csv", "categoryId", "categories");
    }
}
