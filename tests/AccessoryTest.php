<?php
use PHPUnit\Framework\TestCase;

class AccessoryTest extends TestCase
{
    private $CI;
    private $accessory;

    public function setUp()
    {
        // Load CI instance normally
        $this->CI = &get_instance();
        $this->CI->load->model('accessory');
        $this->accessory = new Accessory;
    }

    public function testAccessoryName()
    {
        $this->accessory->setName("abc");
    }
}