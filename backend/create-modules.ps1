$modules = Get-ChildItem modules -Directory

foreach ($module in $modules) {
    $name = $module.Name

    New-Item `
      modules\$name\$name.controller.js,
      modules\$name\$name.service.js,
      modules\$name\$name.routes.js,
      modules\$name\$name.model.js `
      -ItemType File -Force
}
