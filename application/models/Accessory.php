<?php

class Accessory extends Entity
{
    // Accessory Id
    public $id;
    // Accessory name
    public $name;
    // Accessory image path
    public $image;
    // Accessory weight
    public $weight;
    // Accessory damage
    public $damage;
    // Accessory protection
    public $protection;
    // Accessory display name
    public $displayName;
    // Category id (foriegn key)
    public $categoryId;

    public function setName($value)
    {
        $this->name = $value;
    }

    public function setImage($value)
    {
        $this->image = $value;
    }

    public function setWeight($value)
    {
        $this->weight = $value;
    }

    public function setDamage($value)
    {
        $this->damage = $value;
    }

    public function setProtection($value)
    {
        $this->protection = $value;
    }

    public function setDisplayName($value)
    {
        $this->displayName = $value;
    }
}