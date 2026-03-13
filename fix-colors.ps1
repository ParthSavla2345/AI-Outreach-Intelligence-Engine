$srcDir = "c:\Coding\Design SaaS Web App UI\src\app"
$files = Get-ChildItem "$srcDir\**\*.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content

    # Fix bg-white cards -> proper dark card color
    $content = $content.Replace('bg-white rounded-2xl', 'bg-[#1b263b] rounded-2xl')
    $content = $content.Replace('bg-white rounded-xl', 'bg-[#1b263b] rounded-xl')
    $content = $content.Replace('bg-white rounded-lg', 'bg-[#1b263b] rounded-lg')
    $content = $content.Replace('bg-white rounded-full', 'bg-[#1b263b] rounded-full')
    $content = $content.Replace('bg-white rounded-md', 'bg-[#1b263b] rounded-md')
    $content = $content.Replace('bg-white rounded-t-xl', 'bg-[#1b263b] rounded-t-xl')
    $content = $content.Replace('bg-white rounded-b-xl', 'bg-[#1b263b] rounded-b-xl')
    # Catch remaining bg-white
    $content = $content.Replace(' bg-white ', ' bg-[#1b263b] ')
    $content = $content.Replace('"bg-white', '"bg-[#1b263b]')

    # Fix gradient cards that go from white
    $content = $content.Replace('from-white', 'from-[#1b263b]')
    $content = $content.Replace('to-white', 'to-[#0d1b2a]')

    # Fix "Add Lead" button - white bg on dark is wrong
    $content = $content.Replace('bg-white border border-[#415a77]/30 text-[#e0e1dd]', 'bg-[#1b263b] border border-[#415a77]/50 text-[#e0e1dd]')

    # Fix inner nested white boxes (like the AI recommendation inner card)
    $content = $content.Replace('bg-[#1b263b] rounded-xl p-6 mb-4', 'bg-[#0d1b2a] rounded-xl p-6 mb-4')

    # Fix trend color - was using a leftover green
    $content = $content.Replace('text-[#8ea96c]', 'text-[#778da9]')

    # Fix "from-[#e9bb8f]" leftover color
    $content = $content.Replace('from-[#e9bb8f]', 'from-[#778da9]')

    # Improve active nav item - make it more vibrant
    $content = $content.Replace("'bg-[#415a77] text-white shadow-md'", "'bg-[#415a77] text-[#e0e1dd] shadow-lg ring-1 ring-[#778da9]/30'")

    if ($content -ne $original) {
        Set-Content $file.FullName $content -NoNewline
        Write-Host "Updated: $($file.Name)"
    }
}
Write-Host "Done!"
