## Portal SDK Update: v1.3.2.0 -> v1.3.3.0

### Summary
- **Previous version**: 1.3.2.0
- **New version**: 1.3.3.0
- **Update reason**: Version changed
- **Download date**: 2026-06-30 14:07:26 BRT
- **ZIP size**: 3.6 GB

### Official Game Update Notes
- Matching official post found: [BATTLEFIELD 6 GAME UPDATE 1.3.3.0](https://www.ea.com/games/battlefield/battlefield-6/news/battlefield-6-game-update-1-3-3-0).
- The official update frames this as a broader Battlefield 6 update with Portal changes alongside Tactical Obliteration, Casual Battle Royale, Wet Work, and other gameplay/system fixes.
- The Portal notes align with this SDK diff: new moving-platform tooling, Tactical Obliteration/Bomb and M-COM support, Operation Metro and Cairo Bazaar map support, physics impulse examples, Portal performance tools, map-image updates, vehicle resupply support, and removal/replacement of older spatial-object enablement behavior.

### Developer-Relevant Changes
- Adds SDK data for two new or newly exposed maps: `MP_Aftermath_Portal / Bellum1988's Operation Metro` and `MP_Plaza / Cairo Bazaar`, including level scenes, static terrain/assets scenes, export spatial JSON, and `level_info.json` budget entries.
- Adds four example mods: `MovingPlatformExample`, `ObliterationExample`, `PhysicsImpulse_Gym`, and `PortalPerformanceExample`. These look like practical samples for moving objects, bomb/objective gameplay, physics impulse usage, and performance measurement.
- `code/types/mod/index.d.ts` exposes new scripting surface area: `Bomb`, `BombState`, `MCOMArmType`, `GameModeTicker`, `ScoreCriteria`, `RuntimeSpawn_Plaza`, bomb events/functions, free-camera collision controls, third-person camera positioning, game-mode score criteria, area impulse/damage helpers, `IsDefined`/`IsUndefined`-style validity checks, and Portal/server frame-time getters.
- `FbExportData/asset_types.json` changed heavily. This can affect runtime-spawn availability and map-specific object restrictions, especially because many asset `levelRestrictions` now include `MP_Plaza` and/or `MP_Aftermath_Portal`.
- The Godot converter gained compatibility logic for `ObjId` handling on `Bomb`, `CapturePoint`, `DeployCam`, `RingOfFire`, `MCOM`, and `Sector`, plus fixes for direct level static mesh references and TSCN parsing of `&"name"` attributes.
- Documentation updates remove an old rank-up stinger bug note, refresh radio queue wording, and add the new map IDs to the Spatial Editor map table.

### TypeScript API Changes
- `code/types/mod/index.d.ts` version changed from `1.3.2.0` to `1.3.3.0`.
- New opaque object/API type: `Bomb`, now included in the general object union and event/object API surface.
- New enums and enum values include `BombState`, `GameModeTicker`, `MCOMArmType`, `ScoreCriteria`, `Map.Plaza`, `RuntimeSpawn_Plaza`, `InputRestrictions.HasBomb`, `ValueType.Bomb`, and enum metadata entries for the new API groups.
- New objective and Bomb APIs include `GetBomb`, `ForceBombDrop`, `ForceBombReset`, `ForceBombSpawn`, `ForceBombUnspawn`, `GiveBombToPlayer`, `SetBombDropFuseTime`, `SetBombTeam`, `SetBombWorldIconGlobalVisibility`, and `SetMCOMArmType`.
- New event handler signatures include `OngoingBomb`, `OnBombDropped`, `OnBombPickedUp`, and `OnBombStateChanged`, which unlock Tactical Obliteration-style scripted experiences.
- New camera, scoring, performance, and physics helpers include free-camera collision toggles, third-person camera positioning, `SetGameModeCriteria`, `SetGameModeInitialScore`, `SetHUDTicker`, `ApplyAreaImpulseAndDamage`, `ApplyImpulse`, `IsUndefined`, `IsValid`, `GetPortalAverageFrameTime`, and `GetServerAverageFrameTime`.
- Runtime spawn declarations now add `RuntimeSpawn_Plaza` and wire it into runtime spawn unions, while the old `RuntimeSpawn_Sand` block remains present after the new Plaza block.
- Potential script impact: creator code can now reference Bomb/M-COM-specific APIs and Plaza runtime spawns, but any code relying on removed or renamed spawn/object enum values should be checked during migration.

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
