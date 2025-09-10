Write-Host "установка npm install..." -ForegroundColor Green

npm install

Write-Host "установка зависимости из requirements.txt..." -ForegroundColor Green

# Читаем файл и устанавливаем зависимости
Get-Content "requirements.txt" | ForEach-Object {
    $line = $_.Trim()
    if ($line -and !$line.StartsWith("#")) {
        Write-Host "Устанавливаем: $line" -ForegroundColor Cyan
        npm install --save $line
    }
}
Write-Host "Все зависимости установлены!" -ForegroundColor Green
