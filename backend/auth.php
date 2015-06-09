<?php

require __DIR__ . '/vendor/autoload.php';

class Auth {

    private static $secretKey = "secret key";
    private static $algoritm = 'HS256';

    public static function validate($token) {
        try {
            $decoded = JWT::decode($token, self::$secretKey, array(self::$algoritm));
            return $decoded->payloaddata;
        } catch (SignatureInvalidException $e) {
            return FALSE;
        } catch (BeforeValidException $e) {
            return FALSE;
        } catch (ExpiredException $e) {
            return FALSE;
        }
    }

    public static function createToken($payload = array()) {
        $issuedAt = time();
        $notBefore = $issuedAt + 10;             //Adding 10 seconds
        $expire = $notBefore + 60;            // Adding 60 seconds
        $serverName = "localhost"; // Retrieve the server name from config file

        /*
         * Create the token as an array
         */
        $data = [
            'iat' => $issuedAt, // Issued at: time when the token was generated
            //    'iss' => $serverName, // Issuer
            'nbf' => $notBefore, // Not before
            'exp' => $expire, // Expire
            'payloaddata' => $payload   // Data related to the signer user
        ];

        $jwt = JWT::encode(
                        $data, //Data to be encoded in the JWT
                        self::$secretKey, // The signing key
                        self::$algoritm    // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
        );
        
        return $jwt;
    }

}

$token =Auth::createToken(["name" => "qbi"]);
echo $token;
//$requestHeaders = apache_request_headers();
//    $authorizationHeader = $requestHeaders['AUTHORIZATION'];
// $token = str_replace('Bearer ', '', $authorizationHeader);
// 
// if ($authorizationHeader == null) {
//      header('HTTP/1.0 401 Unauthorized');
//      echo "No authorization header sent";
//      exit();
//    }


