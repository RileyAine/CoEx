if ($args[0] -eq $null) {
    echo "Usage: .\docker_push.ps1 ^<TagName^>"
    Exit
}
echo "Building production frontend files"
npm run build
echo "Checking docker process"
$processes = Get-Process "*docker desktop*"
if ($processes.Count -lt 1){
    Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    echo "Starting Docker"
} else {echo "Docker running"}
echo "Building image $($args[0])"
docker build --tag rileysaur/coex:$($args[0]) .
echo "Pushing image to repo"
docker push rileysaur/coex:$($args[0])