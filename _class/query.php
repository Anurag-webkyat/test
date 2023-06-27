<?php
include_once 'dbConfig.php';

class query
{
    public $con;
    public function __construct()
    {
        $obj       = new dbConfig();
        $this->con = $obj->getConnection();
    }

    public function selectData($field, $table, $where)
    {
        $stmt = $this->con->prepare("SELECT $field FROM $table $where");
        $stmt->execute();
        return $stmt->get_result();
        // return $stmt;
    }

    public function insertData($table, $infolog)
    {
        $keys   = array_keys($infolog);
        $values = array_values($infolog);
        $stmt1  = "INSERT INTO $table (" . implode(",", $keys) . ") VALUES (" . str_repeat("?,", count($keys) - 1) . "?)";
        $stmt   = $this->con->prepare($stmt1);
        $stmt->bind_param(str_repeat('s', count($keys)), ...$values);
        return $stmt->execute();
        // return $stmt;
    }

    public function updateData($table, $info, $where)
    {
        $sets = array_map(function ($key, $value) {
            return "$key = ?";
        }, array_keys($info), $info);
        $stmt1 = "UPDATE $table SET " . implode(", ", $sets) . " $where";
        $stmt  = $this->con->prepare($stmt1);
        $stmt->bind_param(str_repeat('s', count($info)), ...array_values($info));
        return $stmt->execute();
        // return $stmt;
    }
}
