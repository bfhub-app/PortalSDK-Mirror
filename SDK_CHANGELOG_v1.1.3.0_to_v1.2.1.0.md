# Portal SDK Detailed Changelog: v1.1.3.0 → v1.2.1.0

## Overview
This update includes significant restructuring, new content, API improvements, and expanded game assets. A total of 143 files were changed with 300,057 insertions and 262,916 deletions.

---

## 1. Repository Structure Reorganization

### Mods Folder Restructure
**What Changed:**
- The root-level `mods/` folder has been completely reorganized
- Working example mods moved to `GodotProject/mods/` (closer to the Godot project structure)
- Deprecated/experimental mods moved to new `unsupported/` directory

**Specific Moves:**

**To `GodotProject/mods/` (Supported Examples):**
- `mods/AcePursuit/` → `GodotProject/mods/AcePursuit/`
- `mods/BumperCars/` → `GodotProject/mods/BumperCars/`
- `mods/_StartHere_BasicTemplate/` → `GodotProject/mods/_StartHere_BasicTemplate/`

**To `unsupported/` (Deprecated/Experimental):**
- `mods/BombSquad/` → `unsupported/BombSquad/`
- `mods/Exfil/` → `unsupported/Exfil/`
- `mods/Skirmish/` → `unsupported/Skirmish/`
- `mods/WarFactory/` → `unsupported/WarFactory/`

**Why This Matters:**
- Clearer separation between production-ready examples and experimental content
- Better alignment with Godot project structure (mods live with the project)
- Developers should reference `GodotProject/mods/` for working examples
- `unsupported/` mods may have incomplete features or known issues

---

## 2. TypeScript and Development Improvements

### tsconfig.json Addition
**What's New:**
Every mod directory now includes a `tsconfig.json` file that extends the root TypeScript configuration.

**Files Added:**
- `GodotProject/mods/AcePursuit/tsconfig.json`
- `GodotProject/mods/BumperCars/tsconfig.json`
- `GodotProject/mods/GibraltarGrandprix/tsconfig.json`
- `GodotProject/mods/_StartHere_BasicTemplate/tsconfig.json`
- `unsupported/BombSquad/tsconfig.json`
- `unsupported/Exfil/tsconfig.json`
- `unsupported/Skirmish/tsconfig.json`
- `unsupported/Vertigo/tsconfig.json`
- `unsupported/WarFactory/tsconfig.json`

**Content:**
```json
{
  "extends": "../../../tsconfig.json"
}
```

**Why This Matters:**
- Better IDE support and IntelliSense for each mod
- Consistent TypeScript compiler settings across all mods
- Easier debugging and error detection during development
- Proper type checking for mod-specific code

### BombSquad JavaScript → TypeScript Migration
**What Changed:**
- `mods/BombSquad/BombSquad.js` (JavaScript) was removed
- `unsupported/BombSquad/BombSquad.ts` (TypeScript) now exists
- Full conversion from compiled JS to source TS

**Impact:**
- BombSquad is now fully TypeScript-based like other mods
- Developers can reference the TypeScript source instead of compiled output
- Note: BombSquad moved to `unsupported/` - use with caution

---

## 3. Code API Improvements

### Type Definitions Reorganization
**Location Change:**
- **Old:** `code/mod/index.d.ts`
- **New:** `code/types/mod/index.d.ts`

**File Stats:** 109 insertions, 146 deletions (net simplification)

**What Changed:**
The type definition file was refactored with improved type safety and cleaner organization.

### New API: Opaque Type System
**Added Type Safety:**
The following types now use opaque types instead of `Any` or `never`:
- `AreaTrigger`
- `Array`
- `CapturePoint`
- `DamageType`
- `DeathType`
- `EmplacementSpawner`
- `HQ`
- `InteractPoint`
- `LootSpawner`
- `MCOM`
- And more...

**Example:**
```typescript
// Old (less type-safe):
export type AreaTrigger = Any;

// New (opaque type for better type safety):
export type AreaTrigger = { _opaque: typeof AreaTriggerSymbol };
```

**Why This Matters:**
- Prevents accidental type mixing
- Better compile-time error detection
- More reliable IDE autocomplete
- Forces proper type usage in mod code

### New Condition System APIs (modlib)
**Added in `code/modlib/index.ts`:**

Three new condition getter functions for additional game object types:

```typescript
export function getHQCondition(obj: mod.HQ, n: number)
export function getSectorCondition(obj: mod.Sector, n: number)
export function getVehicleSpawnerCondition(obj: mod.VehicleSpawner, n: number)
```

**Supporting Arrays:**
```typescript
let hqConditions: Conditions[] = [];
let sectorConditions: Conditions[] = [];
let vehicleSpawnerConditions: Conditions[] = [];
```

**Why This Matters:**
- Enables conditional logic for HQ (Headquarters) objects
- Supports Sector-based game modes (Conquest/Operations)
- Allows scripting vehicle spawner behavior
- Expands the types of game objects that can use the condition system

### Sound API Simplification
**What Changed:**
Sound-related functions were reorganized to be cleaner and more consistent.

**Removed Overloads:**
- Multiple `PlaySound()` variants were consolidated
- Verbose `PlayVO()` overloads simplified
- `StopSound()` variants reduced

**Why This Matters:**
- Cleaner API with fewer confusing overloads
- More predictable behavior when calling sound functions
- Easier to understand sound system documentation

### Gadget System Update
**Changed:**
```typescript
// Old:
AIStartUsingGadget(player: Player, gadget: OpenGadgets, ...)

// New:
AIStartUsingGadget(player: Player, gadget: Gadgets, ...)
```

**Why This Matters:**
- More generic `Gadgets` type instead of `OpenGadgets`
- May indicate expanded gadget system support
- AI can now potentially use a wider range of gadgets

---

## 4. New Game Content

### New Map: MP_Contaminated
**Files Added:**
- `FbExportData/levels/MP_Contaminated.spatial.json` - Spatial data for the map
- `GodotProject/levels/MP_Contaminated.tscn` - Godot scene file
- `GodotProject/static/MP_Contaminated_Assets.tscn` - Static assets
- `GodotProject/static/MP_Contaminated_Terrain.tscn` - Terrain data

**Map Details:**
- New playable map added to the Portal SDK
- Includes full spatial JSON, Godot scenes, and static assets
- Based on naming, likely related to Battlefield 2042 Season content

**Why This Matters:**
- New testing environment for mods
- Additional map for custom game modes
- Expands the variety of environments available

### New Example Mod: Gibraltar Grandprix
**Files Added:**
- `GodotProject/mods/GibraltarGrandprix/GibraltarGrandprix.ts`
- `GodotProject/mods/GibraltarGrandprix/GibraltarGrandprix.strings.json`
- `GodotProject/mods/GibraltarGrandprix/GibraltarGrandprix.tscn`
- `GodotProject/mods/GibraltarGrandprix/tsconfig.json`

**Mod Details:**
Analyzing the TypeScript source code:
- **Version:** 1.0.26
- **Game Type:** Racing mod with time survival mode
- **Features:**
  - Race track system with checkpoints
  - Multiple laps support
  - Vehicle-based gameplay
  - Catchup mechanics (sprint disable option)
  - Configurable player count (8 players)
  - Multiple race tracks with different configurations

**Example Code Structure:**
```typescript
enum GameType {
    race = 0,
    timeSurvival = 1,
}

type RaceTrack = {
    trackId: string;
    name: string;
    laps: number;
    gametype: GameType;
    availableVehicles: mod.VehicleList[]
    checkPoints: Checkpoint[];
};
```

**Why This Matters:**
- First official racing mod example in the SDK
- Demonstrates vehicle-based game mode development
- Shows checkpoint system implementation
- Provides template for custom racing modes

### New Unsupported Mods
**Added Experimental Mods:**

1. **Besieged**
   - `unsupported/Besieged/Besieged.ts`
   - `unsupported/Besieged/Besieged.strings.json`
   - Scene files: `MP_Abbasid_Besieged.tscn`, `MP_Aftermath_Besieged.tscn`
   - Attack/defend style game mode (based on file structure)

2. **Vertigo**
   - `unsupported/Vertigo/Vertigo.ts`
   - `unsupported/Vertigo/Vertigo.strings.json`
   - `unsupported/Vertigo/Vertigo.tscn`
   - Single custom scene, likely unique game mode

**Why These Are Unsupported:**
- May have incomplete features
- Potentially game mode-specific (work on limited maps)
- Could have known bugs or limitations
- Provided for reference/inspiration, not production use

---

## 5. Asset Database Expansion

### FbExportData/asset_types.json Growth
**Statistics:**
- **Old Version:** 8,740 asset types
- **New Version:** 9,304 asset types
- **Net Increase:** +564 asset types (+6.5%)
- **File Size:** 252,799 lines → 269,832 lines (+17,033 lines)

### Sample of New Asset Types Added:
The expansion includes hundreds of new assets. Categories include:

**Aircraft/Vehicle Wrecks:**
- `AircraftWreckage_Jas39_01_Body`
- `AirplaneJAS39Body`, `AirplaneJAS39Cab_01_Contaminated`
- `AirplaneJAS39Cockpit_01`, `AirplaneJAS39LeftWing`
- Various airplane part variations (engines, fuel tanks, frames)

**Environmental Debris:**
- `AftermathDebrisPileMetal_210_01`
- `AftermathDebrisRocks_310`, `AftermathDebrisRocks_310_B`

**Construction/Building:**
- `BR_ConstructionSetWallCinderblockDoorway_A_01_512x384`
- `BR_ConstructionSetWallCinderblock_A_01_512x384`

**Misc Props:**
- `AirDuctPipeCap_01`, `AirDuctPipe_01`, `AirDuctPipe_01_C90`
- `AlleyTrash_02_WinterEvent`, `AlleyTrash_06`
- `Antenna_01_B`, `Antenna_02_B`

**Why This Matters:**
- More props and assets available for custom maps
- Enhanced environmental storytelling options
- Support for new map (MP_Contaminated)
- Greater variety in level decoration

---

## 6. Level Data Updates

### All Existing Maps Updated
**Files Modified (19 spatial JSON files, 19 tscn files):**
- MP_Abbasid
- MP_Aftermath
- MP_Badlands
- MP_Battery
- MP_Capstone
- MP_Dumbo
- MP_Eastwood
- MP_FireStorm
- MP_Granite_ClubHouse_Portal
- MP_Granite_MainStreet_Portal
- MP_Granite_Marina_Portal
- MP_Granite_MilitaryRnD_Portal
- MP_Granite_MilitaryStorage_Portal
- MP_Granite_TechCampus_Portal
- MP_Limestone
- MP_Outskirts
- MP_Portal_Sand
- MP_Tungsten

### What Changed in Level Files
**Nature of Changes:**
- Formatting standardization (line ending changes from CRLF to LF)
- JSON structure remains identical (same transforms, positions, objects)
- No functional changes to level layouts or object placements
- Metadata/version updates

**Technical Details:**
The diff shows only whitespace/formatting changes - the actual spatial data (positions, rotations, static objects) remained unchanged. This is a maintenance update to standardize file formatting.

**Why This Matters:**
- Consistent file formatting across SDK
- Better git diff compatibility
- Standardized for cross-platform development (Windows/Linux/Mac)
- No breaking changes to existing mod compatibility

---

## 7. Godot Editor Configuration Updates

### Minor Config Changes
**Files Updated:**
- `code/gdplugins/bf_portal/bf_portal.config.json`
- `code/gdplugins/bf_portal/memory_plugin/memory_dock.tscn`
- `code/gdplugins/bf_portal/portal_tools/portal_tools_dock.tscn`

**Nature of Changes:**
These are internal Godot plugin configuration files with minor updates, likely:
- Version number updates
- Plugin compatibility updates
- UI layout adjustments in dock panels

**Why This Matters:**
- Ensures editor plugins work correctly with new SDK version
- May include bug fixes for Godot UI tools
- Maintains compatibility with Godot 4.4.1

### Python Utility Updates
**File Modified:**
- `code/gdconverter/src/gdconverter/_utils.py`

**Nature of Changes:**
Internal utility functions for the Godot converter tool. Likely includes:
- Bug fixes
- Improved conversion logic
- Better error handling

---

## 8. Migration Guide for Developers

### If You're Using Mods
1. **Update mod references:**
   - Change `mods/AcePursuit` → `GodotProject/mods/AcePursuit`
   - Change `mods/BumperCars` → `GodotProject/mods/BumperCars`
   - Change `mods/_StartHere_BasicTemplate` → `GodotProject/mods/_StartHere_BasicTemplate`

2. **Be aware of unsupported mods:**
   - BombSquad, Exfil, Skirmish, WarFactory moved to `unsupported/`
   - These mods may have issues - use as reference only

### If You're Writing TypeScript Mods
1. **Update type imports if needed:**
   - Type definitions moved from `code/mod/` to `code/types/mod/`
   - Most imports should auto-resolve, but check if you have absolute paths

2. **Add tsconfig.json to your mod:**
   - Copy the pattern from example mods
   - Content: `{ "extends": "../../../tsconfig.json" }`

3. **Use new condition functions if needed:**
   - `getHQCondition()` for HQ objects
   - `getSectorCondition()` for Sectors
   - `getVehicleSpawnerCondition()` for vehicle spawners

### If You're Using the Asset Database
1. **Check for new assets:**
   - 564 new asset types available
   - Many new props for MP_Contaminated map
   - Aircraft/vehicle wreck pieces
   - Construction elements

2. **Review asset_types.json:**
   - Use the updated database for new projects
   - Check `levelRestrictions` for map-specific assets

### New Map Testing
1. **MP_Contaminated now available:**
   - Test mods on this new map
   - Spatial data in `FbExportData/levels/MP_Contaminated.spatial.json`
   - Scene in `GodotProject/levels/MP_Contaminated.tscn`

---

## Summary Statistics

| Category | Old | New | Change |
|----------|-----|-----|--------|
| **Total Files Changed** | - | - | 143 |
| **Lines Added** | - | - | 300,057 |
| **Lines Removed** | - | - | 262,916 |
| **Asset Types** | 8,740 | 9,304 | +564 |
| **Maps** | 18 | 19 | +1 (MP_Contaminated) |
| **Example Mods (Supported)** | 3 | 4 | +1 (GibraltarGrandprix) |
| **Experimental Mods (Unsupported)** | 4 | 6 | +2 (Besieged, Vertigo) |
| **New Condition APIs** | - | 3 | getHQ, getSector, getVehicleSpawner |

---

## Breaking Changes

### Potential Breaking Changes:
1. **Type definition location:** If you're using absolute imports from `code/mod/index.d.ts`, update to `code/types/mod/index.d.ts`
2. **Mod folder paths:** References to `mods/` directory need updating to `GodotProject/mods/` or `unsupported/`
3. **OpenGadgets → Gadgets:** If you're using `OpenGadgets` type directly, it's now `Gadgets`

### Non-Breaking Changes:
- Level file formatting changes (no functional impact)
- Asset database expansion (only additions, no removals)
- New condition functions (opt-in, doesn't affect existing code)
- tsconfig.json additions (improves dev experience, doesn't break anything)

---

## Recommendations

### For New Developers:
1. Start with `GodotProject/mods/_StartHere_BasicTemplate`
2. Study `GodotProject/mods/GibraltarGrandprix` for vehicle-based gameplay
3. Reference `GodotProject/mods/AcePursuit` or `BumperCars` for simpler examples
4. Avoid `unsupported/` mods unless you understand they may have issues

### For Existing Mod Developers:
1. Update your imports and references to new folder structure
2. Add `tsconfig.json` to your mod for better IDE support
3. Test on new MP_Contaminated map
4. Consider using new condition system APIs if relevant
5. Review new asset types for enhanced level decoration

### For Content Creators:
1. Explore 564 new asset types in the database
2. Test MP_Contaminated map for new content opportunities
3. Reference Gibraltar Grandprix for racing mode inspiration
4. Check Besieged/Vertigo in unsupported for experimental ideas

---

**Generated:** 2026-02-18
**SDK Version Change:** 1.1.3.0 → 1.2.1.0
**Analysis Depth:** Detailed file-by-file examination
