# Start Backend
Write-Host "Iniciando Servidor Backend..."
Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory ".\server" -NoNewWindow

# Start Frontend
Write-Host "Iniciando Cliente Frontend..."
Start-Process -FilePath "cmd" -ArgumentList "/c npm run dev" -WorkingDirectory ".\client" -NoNewWindow

Write-Host "¡Aplicación iniciada!"
Write-Host "Backend: http://localhost:3001"
Write-Host "Frontend: http://localhost:5173"
