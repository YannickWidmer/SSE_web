 <?php
 require_once 'HTTP/Request2.php';
// Explicitly set request method and use_brackets
$request = new HTTP_Request2('https://gcm-http.googleapis.com/gcm/send',
                             HTTP_Request2::METHOD_POST);
$request->setHeader('Authorization: key=AIzaSyBYrR3t5d_53SDIHEEexRkiWzyggOP9ob8;'
        . 'Content-Type:application/json');
$request->setBody(
        "{'data':{hallo}"
        . "}" 
    );
$url = $request->getUrl();

// This will output a page with open bugs for Net_URL2 and HTTP_Request2
echo $request->send()->getBody();
?> 