<?php

class Accessories extends CSV_Model
{
    // Accessories Id
    public $id;
    // Accessories name
    public $name;
    // Accessories image path
    public $image;
    // Accessores weight
    public $weight;
    // Accessories damage
    public $damage;
    // Accessories protection
    public $protection;
    // Accessories display name
    public $displayName;
    // Categories id (foriegn key)
    public $categoriesId;

    /**
     * Contructor for Accessories
     */
    function __construct()
    {
        parent::__construct(APPPATH . "../data/Accessories.csv", "id", "accessories");
    }
}
