# SDK PR Summary Context

Use the prompt and context below to write `.github/cache/sdk-pr-body.md`.

## PR
- Number: 19
- Title: SDK Update: v1.3.2.0 â†’ v1.3.3.0
- URL: https://github.com/bfhub-app/PortalSDK-Mirror/pull/19
- Branch: sdk-update-v1.3.3.0
- Base: main
- Old version: unknown
- New version: 1.3.3.0

## Prompt
Resume this SDK update PR as a GitHub pull request body.

Return only the final Markdown body. Do not wrap it in code fences.

## Context

This repository mirrors the Battlefield Portal SDK used by game mode creators. In this summary, "developers" means Mod and Map creators.

## Goal

Analyze what changed and what developers need to know. Identify patterns from paths and file statistics instead of only listing files.

## Required Structure

Start with:

## Portal SDK Update: v{old_version} -> v{new_version}

Then include:

### Summary
- Previous version
- New version
- Update reason
- Download date, when available
- ZIP size, when available

### Developer-Relevant Changes
Write 3 to 6 bullets focused on likely impact for Mod and Map creators. Be explicit when something is inferred from file paths.

Call out `FbExportData/asset_types.json` when it changed. This file can contain major SDK-facing asset/runtime-spawn changes even when it looks like generated data.

### TypeScript API Changes
Always include this section when `code/types/mod/index.d.ts` changed. Compare the TypeScript declarations from the previous version to the PR version and summarize developer-facing API changes, including:
- New or removed opaque object types.
- New, removed, or renamed enums and enum values.
- New, removed, or changed function signatures.
- New event handler signatures.
- Runtime spawn enum changes by map.
- Anything that could break or unlock Mod creator scripts.

### File Statistics
Include:
- **Files in new SDK**
- **Added**
- **Modified**
- **Deleted**

### New Files in SDK
Show both added and modified files in one list. Each line must say whether the file is **new** or **changed**.

### Changed Files
List changed files grouped for review:
- For `GodotProject/mods/<FolderName>/...`, create a section named `Mod: <FolderName>`.
- Each `.tscn` file inside `GodotProject/static/` is a map. Create map sections as `<InternalMap Name / Game Map Name>`.
- Each `.json` or `.tscn` file inside `GodotProject/levels/` is also a map. Static and level files can refer to the same map; merge them into the same map section by map name.
- For map-mode files such as `MP_Abbasid_CustomConquest.spatial.json` or `MP_Abbasid_CustomConquest.tscn`, split the section as map plus mode: `MP_Abbasid` is the map and `CustomConquest` is the custom Conquest mode. Do the same for suffixes such as `Conquest`, `CustomConquest`, `Winter_Version`, `HybridExample`, and similar mode/template names.
- Anything inside an `unsupported` folder became unsupported after this version. The unsupported item is the folder/type after `unsupported/`, not the filename itself. For example, `unsupported/Besieged/tsconfig.json` means `Besieged` became unsupported or changed as unsupported content.
- For other files, group by the most useful last folder name.
- Use the map-name lookup from the generated context when available. In map section titles, use `<InternalMap Name / Game Map Name>`.
- Use this explicit map codename lookup as the source of truth. If an internal map name is not listed here, keep the internal name and mark the game name as `new or unmapped`:
  - Siege of Cairo - `MP_Abbasid`
  - Empire State - `MP_Aftermath`
  - Bellum1988's Operation Metro - `MP_Aftermath_Portal`
  - Blackwell Fields - `MP_Badlands`
  - Iberian Offensive - `MP_Battery`
  - Liberation Peak - `MP_Capstone`
  - Contaminated - `MP_Contaminated`
  - Manhattan Bridge - `MP_Dumbo`
  - Eastwood - `MP_Eastwood`
  - Operation Firestorm - `MP_FireStorm`
  - Saints Quarter - `MP_Limestone`
  - New Sobek City - `MP_Outskirts`
  - Mirak Valley - `MP_Tungsten`
  - Golf Course - `MP_Granite_ClubHouse_Portal`
  - Defense Nexus - `MP_Granite_TechCampus_Portal`
  - Downtown - `MP_Granite_MainStreet_Portal`
  - Marina - `MP_Granite_Marina_Portal`
  - Cairo Bazaar - `MP_Plaza`
  - Portal Sandbox - `MP_Portal_Sand`
  - Area 22B - `MP_Granite_MilitaryRnD_Portal`
  - Redline Storage - `MP_Granite_MilitaryStorage_Portal`
  - Complex 3 - `MP_Granite_Underground_Portal`
  - Hagental Base - `MP_Subsurface`
  - Railway to Golmud - `MP_GolmudRailway`
- Do not include a "Highest churn files" section.

### Reviewer Notes
Give short notes about what to inspect before merging.

### Changelog
Include any existing changelog/context if provided, cleaned up only when needed.

---

End with:

> Note: This summary was generated from SDK update metadata, file comparison, and repository paths. Review the diff before merging.

*This PR was automatically created by the SDK update workflow.*

## File Statistics
- Files in new SDK: 375
- Added: 29
- Modified: 14
- Deleted: 1
- Renamed: 0

## Map Name Lookup
- `MP_Abbasid` / Siege of Cairo
- `MP_Aftermath` / Empire State
- `MP_Aftermath_Portal` / Bellum1988's Operation Metro
- `MP_Badlands` / Blackwell Fields
- `MP_Battery` / Iberian Offensive
- `MP_Capstone` / Liberation Peak
- `MP_Contaminated` / Contaminated
- `MP_Dumbo` / Manhattan Bridge
- `MP_Eastwood` / Eastwood
- `MP_FireStorm` / Operation Firestorm
- `MP_GolmudRailway` / Railway to Golmud
- `MP_Granite_ClubHouse_Portal` / Golf Course
- `MP_Granite_MainStreet_Portal` / Downtown
- `MP_Granite_Marina_Portal` / Marina
- `MP_Granite_MilitaryRnD_Portal` / Area 22B
- `MP_Granite_MilitaryStorage_Portal` / Redline Storage
- `MP_Granite_TechCampus_Portal` / Defense Nexus
- `MP_Granite_Underground_Portal` / Complex 3
- `MP_Limestone` / Saints Quarter
- `MP_Outskirts` / New Sobek City
- `MP_Plaza` / Cairo Bazaar
- `MP_Portal_Sand` / Portal Sandbox
- `MP_Subsurface` / Hagental Base
- `MP_Tungsten` / Mirak Valley

## Important Files
- **modified** `FbExportData/asset_types.json` - asset type export changed
- **modified** `code/types/mod/index.d.ts` - TypeScript API declarations changed

## New Files in SDK
Added and modified files present in the PR state. The line label says whether each file is new or changed.
- **changed** `FbExportData/asset_types.json`
- **changed** `FbExportData/level_info.json`
- **new** `FbExportData/levels/MP_Aftermath_Portal.spatial.json`
- **new** `FbExportData/levels/MP_Plaza.spatial.json`
- **new** `GodotProject/levels/MP_Aftermath_Portal.tscn`
- **new** `GodotProject/levels/MP_Plaza.tscn`
- **new** `GodotProject/mods/MovingPlatformExample/MovingPlatformExample.strings.json`
- **new** `GodotProject/mods/MovingPlatformExample/MovingPlatformExample.ts`
- **new** `GodotProject/mods/MovingPlatformExample/MovingPlatformExample.tscn`
- **new** `GodotProject/mods/MovingPlatformExample/README_MovingPlatformExample.ts`
- **new** `GodotProject/mods/MovingPlatformExample/tsconfig.json`
- **new** `GodotProject/mods/ObliterationExample/ObliterationExample.strings.json`
- **new** `GodotProject/mods/ObliterationExample/ObliterationExample.ts`
- **new** `GodotProject/mods/ObliterationExample/ObliterationExample.tscn`
- **new** `GodotProject/mods/ObliterationExample/README_ObliterationExample.ts`
- **new** `GodotProject/mods/ObliterationExample/tsconfig.json`
- **new** `GodotProject/mods/PhysicsImpulse_Gym/PhysicsImpulseExample.ts`
- **new** `GodotProject/mods/PhysicsImpulse_Gym/PhysicsImpulseExample.tscn`
- **new** `GodotProject/mods/PhysicsImpulse_Gym/README_PhysicsImpulse.ts`
- **new** `GodotProject/mods/PhysicsImpulse_Gym/tsconfig.json`
- **new** `GodotProject/mods/PortalPerformanceExample/PortalPerformanceExample.strings.json`
- **new** `GodotProject/mods/PortalPerformanceExample/PortalPerformanceExample.ts`
- **new** `GodotProject/mods/PortalPerformanceExample/PortalPerformanceExample.tscn`
- **new** `GodotProject/mods/PortalPerformanceExample/README_PortalPerformanceExample.ts`
- **new** `GodotProject/mods/PortalPerformanceExample/tsconfig.json`
- **new** `GodotProject/static/MP_Aftermath_Portal_Assets.tscn`
- **new** `GodotProject/static/MP_Aftermath_Portal_Terrain.tscn`
- **new** `GodotProject/static/MP_Plaza_Assets.tscn`
- **new** `GodotProject/static/MP_Plaza_Terrain.tscn`
- **new** `Godot_v4.6.3-stable_win64.version`
- **new** `code/gdconverter/src/gdconverter/_compatibility_utils.py`
- **changed** `code/gdconverter/src/gdconverter/_json_parser.py`
- **changed** `code/gdconverter/src/gdconverter/_json_to_tscn.py`
- **changed** `code/gdconverter/src/gdconverter/_tscn_parser.py`
- **changed** `code/gdconverter/src/gdconverter/_tscn_regex.py`
- **changed** `code/gdconverter/src/gdconverter/_tscn_to_json.py`
- **changed** `code/gdconverter/src/gdconverter/convert_paths.py`
- **changed** `code/gdconverter/src/gdconverter/create_godot.py`
- **changed** `code/types/mod/index.d.ts`
- **changed** `docs/pages/gameplay_logic.html`
- **changed** `docs/pages/spatial_editor.html`
- **changed** `docs/searchindex.js`
- **changed** `sdk.version.json`

## Grouped Changed Files

### Core SDK data: asset types
- **Modified** `FbExportData/asset_types.json`

### Folder: FbExportData
- **Modified** `FbExportData/level_info.json`

### Folder: docs
- **Modified** `docs/searchindex.js`

### Folder: gdconverter
- **Added** `code/gdconverter/src/gdconverter/_compatibility_utils.py`
- **Modified** `code/gdconverter/src/gdconverter/_json_parser.py`
- **Modified** `code/gdconverter/src/gdconverter/_json_to_tscn.py`
- **Modified** `code/gdconverter/src/gdconverter/_tscn_parser.py`
- **Modified** `code/gdconverter/src/gdconverter/_tscn_regex.py`
- **Modified** `code/gdconverter/src/gdconverter/_tscn_to_json.py`
- **Modified** `code/gdconverter/src/gdconverter/convert_paths.py`
- **Modified** `code/gdconverter/src/gdconverter/create_godot.py`

### Folder: mod
- **Modified** `code/types/mod/index.d.ts`

### Folder: pages
- **Modified** `docs/pages/gameplay_logic.html`
- **Modified** `docs/pages/spatial_editor.html`

### Map: MP_Aftermath_Portal / Bellum1988's Operation Metro
- **Added** `FbExportData/levels/MP_Aftermath_Portal.spatial.json`
- **Added** `GodotProject/levels/MP_Aftermath_Portal.tscn`
- **Added** `GodotProject/static/MP_Aftermath_Portal_Assets.tscn`
- **Added** `GodotProject/static/MP_Aftermath_Portal_Terrain.tscn`

### Map: MP_Plaza / Cairo Bazaar
- **Added** `FbExportData/levels/MP_Plaza.spatial.json`
- **Added** `GodotProject/levels/MP_Plaza.tscn`
- **Added** `GodotProject/static/MP_Plaza_Assets.tscn`
- **Added** `GodotProject/static/MP_Plaza_Terrain.tscn`

### Mod: MovingPlatformExample
- **Added** `GodotProject/mods/MovingPlatformExample/MovingPlatformExample.strings.json`
- **Added** `GodotProject/mods/MovingPlatformExample/MovingPlatformExample.ts`
- **Added** `GodotProject/mods/MovingPlatformExample/MovingPlatformExample.tscn`
- **Added** `GodotProject/mods/MovingPlatformExample/README_MovingPlatformExample.ts`
- **Added** `GodotProject/mods/MovingPlatformExample/tsconfig.json`

### Mod: ObliterationExample
- **Added** `GodotProject/mods/ObliterationExample/ObliterationExample.strings.json`
- **Added** `GodotProject/mods/ObliterationExample/ObliterationExample.ts`
- **Added** `GodotProject/mods/ObliterationExample/ObliterationExample.tscn`
- **Added** `GodotProject/mods/ObliterationExample/README_ObliterationExample.ts`
- **Added** `GodotProject/mods/ObliterationExample/tsconfig.json`

### Mod: PhysicsImpulse_Gym
- **Added** `GodotProject/mods/PhysicsImpulse_Gym/PhysicsImpulseExample.ts`
- **Added** `GodotProject/mods/PhysicsImpulse_Gym/PhysicsImpulseExample.tscn`
- **Added** `GodotProject/mods/PhysicsImpulse_Gym/README_PhysicsImpulse.ts`
- **Added** `GodotProject/mods/PhysicsImpulse_Gym/tsconfig.json`

### Mod: PortalPerformanceExample
- **Added** `GodotProject/mods/PortalPerformanceExample/PortalPerformanceExample.strings.json`
- **Added** `GodotProject/mods/PortalPerformanceExample/PortalPerformanceExample.ts`
- **Added** `GodotProject/mods/PortalPerformanceExample/PortalPerformanceExample.tscn`
- **Added** `GodotProject/mods/PortalPerformanceExample/README_PortalPerformanceExample.ts`
- **Added** `GodotProject/mods/PortalPerformanceExample/tsconfig.json`

### Repository root
- **Added** `Godot_v4.6.3-stable_win64.version`
- **Modified** `sdk.version.json`
- **Deleted** `Godot_v4.6.1-stable_win64.version`

## Existing PR Body
## Portal SDK Update: v1.3.2.0 -> v1.3.3.0

### Summary
- **Previous version**: 1.3.2.0
- **New version**: 1.3.3.0
- **Update reason**: Version changed
- **Download date**: 2026-06-30 14:07:26 BRT
- **ZIP size**: 3.6 GB

### Developer-Relevant Changes
- Adds SDK data for two new or newly exposed maps: `MP_Aftermath_Portal / Bellum1988's Operation Metro` and `MP_Plaza / Cairo Bazaar`, including level scenes, static terrain/assets scenes, export spatial JSON, and `level_info.json` budget entries.
- Adds four example mods: `MovingPlatformExample`, `ObliterationExample`, `PhysicsImpulse_Gym`, and `PortalPerformanceExample`. These look like practical samples for moving objects, bomb/objective gameplay, physics impulse usage, and performance measurement.
- `code/types/mod/index.d.ts` exposes new scripting surface area: `Bomb`, `BombState`, `MCOMArmType`, `GameModeTicker`, `ScoreCriteria`, `RuntimeSpawn_Plaza`, bomb events/functions, free-camera collision controls, third-person camera positioning, game-mode score criteria, area impulse/damage helpers, `IsDefined`/`IsUndefined`-style validity checks, and Portal/server frame-time getters.
- `FbExportData/asset_types.json` changed heavily. This can affect runtime-spawn availability and map-specific object restrictions, especially because many asset `levelRestrictions` now include `MP_Plaza` and/or `MP_Aftermath_Portal`.
- The Godot converter gained compatibility logic for `ObjId` handling on `Bomb`, `CapturePoint`, `DeployCam`, `RingOfFire`, `MCOM`, and `Sector`, plus fixes for direct level static mesh references and TSCN parsing of `&"name"` attributes.
- Documentation updates remove an old rank-up stinger bug note, refresh radio queue wording, and add the new map IDs to the Spatial Editor map table.

### File Statistics
- **Files in new SDK**: 375
- **Added**: 29
- **Modified**: 14
- **Deleted**: 1

### New Files in SDK
- **changed** `FbExportData/asset_types.json`
- **changed** `FbExportData/level_info.json`
- **new** `FbExportData/levels/MP_Aftermath_Portal.spatial.json`
- **new** `FbExportData/levels/MP_Plaza.spatial.json`
- **new** `GodotProject/levels/MP_Aftermath_Portal.tscn`
- **new** `GodotProject/levels/MP_Plaza.tscn`
- **new** `GodotProject/mods/MovingPlatformExample/MovingPlatformExample.strings.json`
- **new** `GodotProject/mods/MovingPlatformExample/MovingPlatformExample.ts`
- **new** `GodotProject/mods/MovingPlatformExample/MovingPlatformExample.tscn`
- **new** `GodotProject/mods/MovingPlatformExample/README_MovingPlatformExample.ts`
- **new** `GodotProject/mods/MovingPlatformExample/tsconfig.json`
- **new** `GodotProject/mods/ObliterationExample/ObliterationExample.strings.json`
- **new** `GodotProject/mods/ObliterationExample/ObliterationExample.ts`
- **new** `GodotProject/mods/ObliterationExample/ObliterationExample.tscn`
- **new** `GodotProject/mods/ObliterationExample/README_ObliterationExample.ts`
- **new** `GodotProject/mods/ObliterationExample/tsconfig.json`
- **new** `GodotProject/mods/PhysicsImpulse_Gym/PhysicsImpulseExample.ts`
- **new** `GodotProject/mods/PhysicsImpulse_Gym/PhysicsImpulseExample.tscn`
- **new** `GodotProject/mods/PhysicsImpulse_Gym/README_PhysicsImpulse.ts`
- **new** `GodotProject/mods/PhysicsImpulse_Gym/tsconfig.json`
- **new** `GodotProject/mods/PortalPerformanceExample/PortalPerformanceExample.strings.json`
- **new** `GodotProject/mods/PortalPerformanceExample/PortalPerformanceExample.ts`
- **new** `GodotProject/mods/PortalPerformanceExample/PortalPerformanceExample.tscn`
- **new** `GodotProject/mods/PortalPerformanceExample/README_PortalPerformanceExample.ts`
- **new** `GodotProject/mods/PortalPerformanceExample/tsconfig.json`
- **new** `GodotProject/static/MP_Aftermath_Portal_Assets.tscn`
- **new** `GodotProject/static/MP_Aftermath_Portal_Terrain.tscn`
- **new** `GodotProject/static/MP_Plaza_Assets.tscn`
- **new** `GodotProject/static/MP_Plaza_Terrain.tscn`
- **new** `Godot_v4.6.3-stable_win64.version`
- **new** `code/gdconverter/src/gdconverter/_compatibility_utils.py`
- **changed** `code/gdconverter/src/gdconverter/_json_parser.py`
- **changed** `code/gdconverter/src/gdconverter/_json_to_tscn.py`
- **changed** `code/gdconverter/src/gdconverter/_tscn_parser.py`
- **changed** `code/gdconverter/src/gdconverter/_tscn_regex.py`
- **changed** `code/gdconverter/src/gdconverter/_tscn_to_json.py`
- **changed** `code/gdconverter/src/gdconverter/convert_paths.py`
- **changed** `code/gdconverter/src/gdconverter/create_godot.py`
- **changed** `code/types/mod/index.d.ts`
- **changed** `docs/pages/gameplay_logic.html`
- **changed** `docs/pages/spatial_editor.html`
- **changed** `docs/searchindex.js`
- **changed** `sdk.version.json`

### Changed Files

#### Core SDK Data: Asset Types
- **Modified** `FbExportData/asset_types.json`
  - Large generated-data update. Review as runtime-spawn and map-restriction data, not just noise.
  - Many assets now include `MP_Plaza` and/or `MP_Aftermath_Portal` in `levelRestrictions`.
  - Adds/updates SDK-facing object entries including `Bomb`, `VehicleResupplyStation`, and Portal platform barrier naming.

#### Core SDK Data: Levels
- **Modified** `FbExportData/level_info.json`
  - Adds `MP_Aftermath_Portal` with `physicsCostMax: 100000`.
  - Adds `MP_Plaza` with `physicsCostMax: 0`.

#### Map: MP_Aftermath_Portal / Bellum1988's Operation Metro
- **Added** `FbExportData/levels/MP_Aftermath_Portal.spatial.json`
- **Added** `GodotProject/levels/MP_Aftermath_Portal.tscn`
- **Added** `GodotProject/static/MP_Aftermath_Portal_Assets.tscn`
- **Added** `GodotProject/static/MP_Aftermath_Portal_Terrain.tscn`

#### Map: MP_Plaza / Cairo Bazaar
- **Added** `FbExportData/levels/MP_Plaza.spatial.json`
- **Added** `GodotProject/levels/MP_Plaza.tscn`
- **Added** `GodotProject/static/MP_Plaza_Assets.tscn`
- **Added** `GodotProject/static/MP_Plaza_Terrain.tscn`

#### Mod: MovingPlatformExample
- **Added** `GodotProject/mods/MovingPlatformExample/MovingPlatformExample.strings.json`
- **Added** `GodotProject/mods/MovingPlatformExample/MovingPlatformExample.ts`
- **Added** `GodotProject/mods/MovingPlatformExample/MovingPlatformExample.tscn`
- **Added** `GodotProject/mods/MovingPlatformExample/README_MovingPlatformExample.ts`
- **Added** `GodotProject/mods/MovingPlatformExample/tsconfig.json`

#### Mod: ObliterationExample
- **Added** `GodotProject/mods/ObliterationExample/ObliterationExample.strings.json`
- **Added** `GodotProject/mods/ObliterationExample/ObliterationExample.ts`
- **Added** `GodotProject/mods/ObliterationExample/ObliterationExample.tscn`
- **Added** `GodotProject/mods/ObliterationExample/README_ObliterationExample.ts`
- **Added** `GodotProject/mods/ObliterationExample/tsconfig.json`

#### Mod: PhysicsImpulse_Gym
- **Added** `GodotProject/mods/PhysicsImpulse_Gym/PhysicsImpulseExample.ts`
- **Added** `GodotProject/mods/PhysicsImpulse_Gym/PhysicsImpulseExample.tscn`
- **Added** `GodotProject/mods/PhysicsImpulse_Gym/README_PhysicsImpulse.ts`
- **Added** `GodotProject/mods/PhysicsImpulse_Gym/tsconfig.json`

#### Mod: PortalPerformanceExample
- **Added** `GodotProject/mods/PortalPerformanceExample/PortalPerformanceExample.strings.json`
- **Added** `GodotProject/mods/PortalPerformanceExample/PortalPerformanceExample.ts`
- **Added** `GodotProject/mods/PortalPerformanceExample/PortalPerformanceExample.tscn`
- **Added** `GodotProject/mods/PortalPerformanceExample/README_PortalPerformanceExample.ts`
- **Added** `GodotProject/mods/PortalPerformanceExample/tsconfig.json`

#### Folder: gdconverter
- **Added** `code/gdconverter/src/gdconverter/_compatibility_utils.py`
- **Modified** `code/gdconverter/src/gdconverter/_json_parser.py`
- **Modified** `code/gdconverter/src/gdconverter/_json_to_tscn.py`
- **Modified** `code/gdconverter/src/gdconverter/_tscn_parser.py`
- **Modified** `code/gdconverter/src/gdconverter/_tscn_regex.py`
- **Modified** `code/gdconverter/src/gdconverter/_tscn_to_json.py`
- **Modified** `code/gdconverter/src/gdconverter/convert_paths.py`
- **Modified** `code/gdconverter/src/gdconverter/create_godot.py`

#### Folder: mod
- **Modified** `code/types/mod/index.d.ts`

#### Folder: pages
- **Modified** `docs/pages/gameplay_logic.html`
- **Modified** `docs/pages/spatial_editor.html`

#### Folder: docs
- **Modified** `docs/searchindex.js`

#### Repository Root
- **Added** `Godot_v4.6.3-stable_win64.version`
- **Modified** `sdk.version.json`
- **Deleted** `Godot_v4.6.1-stable_win64.version`

### Reviewer Notes
- Check the new Bomb/Obliteration APIs against the `ObliterationExample` sample so the generated TypeScript declarations match real Portal behavior.
- Review `FbExportData/asset_types.json` with attention to `MP_Plaza` and `MP_Aftermath_Portal` restrictions, since runtime-spawn availability may change for creators.
- Confirm the new map packages open correctly in Godot and that their static terrain/assets scenes match the exported spatial JSON.
- Validate the gdconverter compatibility changes with both JSON -> TSCN and TSCN -> JSON paths, especially ObjId defaults for objective-style objects.

### Changelog

<details>
<summary>Existing workflow changelog</summary>

### Version 1.3.3.0
**Released**: 2026-06-30  
**Previous version**: 1.3.2.0

### File Changes
- **Total files in SDK**: 439
- **Added**: 29 files
- **Modified**: 14 files
- **Deleted**: 1 file

> **Note**: Existing workflow statistics exclude `.gd`, `.glb`, test folders, and GodotProject runtime folders.

</details>

> Note: This summary was generated from SDK update metadata, file comparison, and repository paths. Review the diff before merging.

*This PR was automatically created by the SDK update workflow.*
