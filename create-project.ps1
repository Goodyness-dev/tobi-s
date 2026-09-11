param (
    [Parameter(Mandatory=$true)]
    [string]$Name,
    [string]$Slug = ""
)

if ($Slug -eq "") {
    $Slug = ($Name.ToLower() -replace '[^a-z0-9]+', '-').Trim('-')
}

node "$PSScriptRoot\scaffold-new-project.js" "$Name" "$Slug"
