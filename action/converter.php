<?php
class CurrencyConverter
{
    // Class properties
    private $curl;
    private $from;
    private $to;
    private $amount;
    private $apikey;

    // Constructor to initialize class properties
    public function __construct($from, $to, $amount)
    {
        // Validate input data
        if (empty($from) || empty($to) || empty($amount)) {
            throw new \Exception('Invalid input parameters');
        }

        if (!is_numeric($amount)) {
            throw new \Exception('Amount must be a number');
        }

        // Assign values to class properties
        $this->from   = $from;
        $this->to     = $to;
        $this->amount = $amount;
        $this->apikey = "cOxnpKf1ep0V1DkoyHATtlYHmmy1adlM";
        $this->curl   = curl_init();
    }

    // Function to convert currency
    public function convert()
    {
        // Set curl options
        curl_setopt_array($this->curl, array(
            CURLOPT_URL            => "https://api.apilayer.com/exchangerates_data/convert?to={$this->to}&from={$this->from}&amount={$this->amount}",
            CURLOPT_HTTPHEADER     => array(
                "Content-Type: text/plain",
                "apikey: {$this->apikey}",
            ),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => "",
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST  => "GET",
        ));

        // Execute curl request and get response
        $response = curl_exec($this->curl);

        // Close the curl connection
        curl_close($this->curl);

        // Decode json response and get result
        $json_data = json_decode($response);
        echo $json_data->result;
    }
}

// Create an object of CurrencyConverter class
$converter = new CurrencyConverter('USD', 'INR', 1);

// Convert currency using convert() method
$converter->convert();
