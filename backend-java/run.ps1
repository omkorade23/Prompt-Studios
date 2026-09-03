$envFilePath = ".\.env"

if (Test-Path $envFilePath) {
    foreach ($line in Get-Content $envFilePath) {
        if (![string]::IsNullOrWhiteSpace($line) -and !$line.StartsWith("#")) {
            $name, $value = $line.Split("=", 2)
            Set-Item -Path env:\$name -Value $value
        }
    }
}

$dbUrl = $env:DATABASE_URL
if ($dbUrl -match "^postgresql\+psycopg://") {
    $dbUrl = $dbUrl -replace "^postgresql\+psycopg://", "postgresql://"
}

if ($dbUrl -match "^postgresql://([^:]+):([^@]+)@([^/]+)/(.+)$") {
    $dbUser = $matches[1]
    $dbPass = $matches[2]
    $dbHost = $matches[3]
    $dbName = $matches[4]
    
    $env:DATABASE_URL = "jdbc:postgresql://$dbHost/$dbName"
    $env:SPRING_DATASOURCE_USERNAME = $dbUser
    $env:SPRING_DATASOURCE_PASSWORD = $dbPass
} else {
    $env:DATABASE_URL = $dbUrl -replace "^postgresql://", "jdbc:postgresql://"
}

$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot\"

$env:SPRING_PROFILES_ACTIVE = "dev"
.\mvnw.cmd spring-boot:run
