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
        } catch (UnexpectedValueException $e) {
            return FALSE;
        } catch (DomainException $e) {
            return FALSE;
        }
        
    }

    public static function createToken($payload = array()) {
        $issuedAt = time();
        $notBefore = $issuedAt + 10;             //Adding 10 seconds
        $expire = $notBefore + 600;            // Adding 60 seconds
        $serverName = "localhost"; // Retrieve the server name from config file

        /*
         * Create the token as an array
         */
        $data = [
            'iat' => $issuedAt, // Issued at: time when the token was generated
            //    'iss' => $serverName, // Issuer
//            'nbf' => $notBefore, // Not before
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

    public static $messages = array(
        // Informational 1xx
        100 => 'Continue',
        101 => 'Switching Protocols',
        // Success 2xx
        200 => 'OK',
        201 => 'Created',
        202 => 'Accepted',
        203 => 'Non-Authoritative Information',
        204 => 'No Content',
        205 => 'Reset Content',
        206 => 'Partial Content',
        // Redirection 3xx
        300 => 'Multiple Choices',
        301 => 'Moved Permanently',
        302 => 'Found', // 1.1
        303 => 'See Other',
        304 => 'Not Modified',
        305 => 'Use Proxy',
        // 306 is deprecated but reserved
        307 => 'Temporary Redirect',
        // Client Error 4xx
        400 => 'Bad Request',
        401 => 'Unauthorized',
        402 => 'Payment Required',
        403 => 'Forbidden',
        404 => 'Not Found',
        405 => 'Method Not Allowed',
        406 => 'Not Acceptable',
        407 => 'Proxy Authentication Required',
        408 => 'Request Timeout',
        409 => 'Conflict',
        410 => 'Gone',
        411 => 'Length Required',
        412 => 'Precondition Failed',
        413 => 'Request Entity Too Large',
        414 => 'Request-URI Too Long',
        415 => 'Unsupported Media Type',
        416 => 'Requested Range Not Satisfiable',
        417 => 'Expectation Failed',
        // Server Error 5xx
        500 => 'Internal Server Error',
        501 => 'Not Implemented',
        502 => 'Bad Gateway',
        503 => 'Service Unavailable',
        504 => 'Gateway Timeout',
        505 => 'HTTP Version Not Supported',
        509 => 'Bandwidth Limit Exceeded'
    );

}

//$requestHeaders = apache_request_headers();
//    $authorizationHeader = $requestHeaders['AUTHORIZATION'];
// $token = str_replace('Bearer ', '', $authorizationHeader);
// 
// if ($authorizationHeader == null) {
//      header('HTTP/1.0 401 Unauthorized');
//      echo "No authorization header sent";
//      exit();
//    }


