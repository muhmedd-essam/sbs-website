<?php
error_reporting(0);
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false]);
  exit;
}

$correctAnswers = ['grunya sukhareva', 'جرونيا إيفيموفنا سوخاريفا', 'جرونيا سوخاريفا','груня ефимовна сухарева'];

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data) || !isset($data['answer']) || !is_string($data['answer'])) {
  echo json_encode(['success' => false]);
  exit;
}

function normalizeAnswer($str) {
  $str = mb_strtolower(trim($str), 'UTF-8');
  $str = preg_replace('/\s+/', '', $str);
  $str = preg_replace('/[^\p{L}\p{N}]/u', '', $str);
  return $str;
}

$userAnswer = normalizeAnswer($data['answer']);

$matched = false;
foreach ($correctAnswers as $correct) {
  $expected = normalizeAnswer($correct);
  $distance = levenshtein($userAnswer, $expected);
  if ($distance <= 2) {
    $matched = true;
    break;
  }
}

$successText = "";

if ($matched) {
  echo json_encode([
    'success' => true,
    'title'   => 'Congratulations! You solved the fourth riddle!',
    'text'    => $successText,
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} else {
  echo json_encode(['success' => false]);
}
