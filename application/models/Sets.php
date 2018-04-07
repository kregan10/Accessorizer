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

    // provide form validation rules
    public function rules()
    {
        $config = array(
            ['field' => 'name', 'rules' => 'required', 'errors' => array('required' => 'You must provide a %s')],
            
        );
        return $config;
    }

    protected function store()
    {
        // rebuild the keys table
        $this->reindex();
        //---------------------
        if (($handle = fopen($this->_origin, "w")) !== FALSE)
        {
            fputcsv($handle, $this->_fields);
            foreach ($this->_data as $key => $record)
                fputcsv($handle, array_values((array) $record));
            fclose($handle);
        }
        // --------------------
    }
}
