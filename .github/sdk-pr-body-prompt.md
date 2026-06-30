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
