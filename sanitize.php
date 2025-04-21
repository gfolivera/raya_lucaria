<?php
const FILTERS = [
    'string' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
    'string[]' => [
        'filter' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
        'flags' => FILTER_REQUIRE_ARRAY
    ],
    'email' => FILTER_SANITIZE_EMAIL,
    'int' => [
        'filter' => FILTER_SANITIZE_NUMBER_INT,
        'flags' => FILTER_REQUIRE_SCALAR
    ],
    'int[]' => [
        'filter' => FILTER_SANITIZE_NUMBER_INT,
        'flags' => FILTER_REQUIRE_ARRAY
    ],
    'float' => [
        'filter' => FILTER_SANITIZE_NUMBER_FLOAT,
        'flags' => FILTER_FLAG_ALLOW_FRACTION
    ],
    'float[]' => [
        'filter' => FILTER_SANITIZE_NUMBER_FLOAT,
        'flags' => FILTER_REQUIRE_ARRAY
    ],
    'url' => FILTER_SANITIZE_URL,
];

/** 
* limpar espaços em branco de um array.
* @param array $inputs
* @return array
*/
function trim_data(array $inputs): array
{
    return array_map(function ($input) {
            if(is_string($input))
            {
                return trim($input);
            }
            elseif(is_array($input))
            {
                return trim_data($input);
            }
            return $input;
        }, $inputs);
    
}

/* sanitiza dados de entrada, GET ou POST.
*  
*/
function sanitize(array $inputs, array $fields, array $filters = FILTERS, bool $trim = true): array
{
    $options = array_map(fn($field) => $filters[$field], $fields);
    $sanitized =  filter_var_array($inputs, $options);
    return $trim ? trim_data($sanitized) : $sanitized;
}

?>