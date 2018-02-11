<?php

class Accessories extends CSV_Model
{
    // Accessory Id
    public $accessoryId;
    // Accessory name
    public $accessoryName;
    // Accessory image path
    public $accessoryImage;
    // Accessory weight
    public $accessoryWeight;
    // Accessory damage
    public $accessoryDamage;
    // Accessory protection
    public $accessoryProtection;
    // Accessory display name
    public $accessoryDisplayName;
    // category name
    public $categoryName;
    // Category id (foriegn key)
    public $categoryId;

    /**
     * Contructor for Accessories
     */
    function __construct()
    {
        parent::__construct(APPPATH . "../data/Accessories.csv", "accessoryId", "accessories");
    }
}
