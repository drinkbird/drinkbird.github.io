$ErrorActionPreference = "Stop"

function Require-Command {
    param(
        [string]$Name,
        [string]$InstallHint
    )

    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "$Name was not found. $InstallHint"
    }
}

Write-Host "Checking Windows development prerequisites..."
Require-Command "ruby.exe" "Install RubyInstaller with Devkit Ruby 3.3 from https://rubyinstaller.org/."
Require-Command "ridk.cmd" "Reinstall RubyInstaller with the MSYS2 Devkit enabled."
Require-Command "bundle.bat" "Run: gem install bundler"
Require-Command "node.exe" "Install Node.js 24 LTS from https://nodejs.org/."
Require-Command "npm.cmd" "Reinstall Node.js and include npm."

$rubyVersion = (& ruby.exe -e "print RUBY_VERSION").Trim()
if (-not $rubyVersion.StartsWith("3.3.")) {
    Write-Warning "Ruby $rubyVersion is installed. CI uses Ruby 3.3; matching it avoids native-gem differences."
}

Write-Host "Ensuring the RubyInstaller MSYS2/MinGW toolchain is available..."
& ridk.cmd exec sh -lc "gcc --version >/dev/null 2>&1"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Installing the RubyInstaller MSYS2 development toolchain..."
    & ridk.cmd install 3
    if ($LASTEXITCODE -ne 0) {
        throw "RubyInstaller Devkit installation failed. Run 'ridk.cmd install 3' in a terminal for details."
    }

    & ridk.cmd exec sh -lc "gcc --version >/dev/null 2>&1"
    if ($LASTEXITCODE -ne 0) {
        throw "RubyInstaller Devkit is still unavailable after installation."
    }
}

Write-Host "Installing Ruby gems..."
& bundle.bat install
if ($LASTEXITCODE -ne 0) { throw "bundle install failed." }

Write-Host "Installing Node dependencies..."
& npm.cmd install
if ($LASTEXITCODE -ne 0) { throw "npm install failed." }

Write-Host "Verifying the environment..."
& node.exe scripts/doctor.js
if ($LASTEXITCODE -ne 0) { throw "Environment verification failed." }

Write-Host ""
Write-Host "Windows setup complete. Start the site with: npm.cmd run serve"
