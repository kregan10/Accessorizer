<?php
class Sets extends CSV_Model
{
    // Sets Id
    public $id;
    // Sets name
    public $name;
    // Sets weapon
    public $weapon;
    // Sets head
    public $head;
    // Sets chest
    public $chest;
    // Sets accessory
    public $accessory;

    /**
     * Contructor for Sets
     */
    function __construct()
    {
        parent::__construct(APPPATH . "../data/Sets.csv", "id", "sets");
    }
}
