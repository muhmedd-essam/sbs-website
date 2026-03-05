<?php
error_reporting(0);
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
  exit;
}

$required = ['fullName', 'university', 'faculty', 'academicYear', 'phone', 'email', 'council'];
$errors = [];

foreach ($required as $field) {
  $val = isset($_POST[$field]) ? trim((string) $_POST[$field]) : '';
  if ($val === '') {
    $errors[] = ucfirst($field) . ' is required.';
  }
}

if (!empty($errors)) {
  echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
  exit;
}

$email = trim((string) $_POST['email']);
if (!preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email)) {
  $errors[] = 'Please enter a valid email address.';
}

$phone = trim((string) $_POST['phone']);
if (!preg_match('/^[0-9+\-\s]{7,}$/', $phone)) {
  $errors[] = 'Please enter a valid phone number.';
}

$allowedCouncils = [
  'aiCouncil', 'flutterCouncil', 'socialMediaCouncil',
  'hrFunctionsCouncil', 'entrepreneurshipCouncil', 'accountingBankingCouncil'
];
$council = trim((string) $_POST['council']);
if (!in_array($council, $allowedCouncils, true)) {
  $errors[] = 'Please select a valid council.';
}

if (!empty($errors)) {
  echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
  exit;
}

$application = [
  'id' => 'sbs-' . uniqid('', true),
  'createdAt' => date('Y-m-d H:i:s'),
  'fullName' => trim((string) $_POST['fullName']),
  'university' => trim((string) $_POST['university']),
  'faculty' => trim((string) $_POST['faculty']),
  'academicYear' => trim((string) $_POST['academicYear']),
  'phone' => $phone,
  'email' => $email,
  'council' => $council,
  'experience' => isset($_POST['experience']) ? trim((string) $_POST['experience']) : '',
];

$dataDir = __DIR__ . '/data';
$dataFile = $dataDir . '/applications.json';

if (!is_dir($dataDir)) {
  if (!@mkdir($dataDir, 0755, true)) {
    echo json_encode(['success' => false, 'error' => 'Could not create data directory.']);
    exit;
  }
}

$list = [];
if (file_exists($dataFile)) {
  $raw = @file_get_contents($dataFile);
  if ($raw !== false) {
    $list = json_decode($raw, true);
  }
  if (!is_array($list)) {
    $list = [];
  }
}

$list[] = $application;
$json = json_encode($list, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

if (@file_put_contents($dataFile, $json) === false) {
  echo json_encode(['success' => false, 'error' => 'Could not save application. Please try again.']);
  exit;
}

echo json_encode(['success' => true]);
