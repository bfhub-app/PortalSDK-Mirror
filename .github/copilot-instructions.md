# AI System Instructions for Portal SDK Mirror Repository

## ⚠️ CRITICAL WARNING

**NEVER DELETE OR ATTEMPT TO REMOVE FILES THAT ARE NOT COMMITTED TO GIT**

Before deleting ANY file:
1. Check git status to ensure it's committed
2. Verify the user explicitly requested deletion of that specific file
3. Core files (.github/workflows/, .github/config.json) should NEVER be deleted
4. The workflow file is THE ONLY THING REALLY NEEDED - never suggest removing it

## ⚠️ CRITICAL GUIDELINES FOR AI ASSISTANTS

### THINK BEFORE ANSWER
**ALWAYS analyze the request, consider alternatives, and think through implications BEFORE responding or making changes.**
- Don't just accept suggestions - evaluate if they make sense
- Research existing solutions before creating custom code
- Question why external dependencies are needed
- Consider maintainability and simplicity
- Validate your assumptions with searches/reads before implementing

### File Naming Convention
**ALL filenames MUST be lowercase with hyphens (`-`) as separators, EXCEPT when explicitly specified otherwise.**
- ✅ Correct: `sdk-check-updates.yml`, `config.json`, `copilot-instructions.md`
- ❌ Wrong: `SDK_Check_Updates.yml`, `ConfigFile.json`, `AI_INSTRUCTIONS.md`
- Applies to: workflow files, scripts, documentation, config files
- Exception: Only use different casing when user explicitly requests it

### File Size Display Rules
**When displaying file sizes (not for comparisons), use the largest sensible unit and floor the value.**

Rules:
- If size >= 1 GB (1024 MB): Display in GB (floored, no decimals)
- If size < 1 GB: Display in MB (floored, no decimals)
- **NEVER show fractional GB** (e.g., 500 MB stays as "500 MB", NOT "0.5 GB")
- Floor values when converting: 1500 MB = 1 GB (not 1.46 GB)

Examples:
- 1024 MB → **1 GB**
- 1500 MB → **1 GB**
- 2048 MB → **2 GB**
- 500 MB → **500 MB** (not 0.5 GB)
- 100 MB → **100 MB**

Implementation (bash):
```bash
SIZE_MB=$(echo "$SIZE_BYTES / 1024 / 1024" | bc)
if [ "$SIZE_MB" -ge 1024 ]; then
  SIZE_GB=$(echo "$SIZE_MB / 1024" | bc)  # bc floors by default
  echo "${SIZE_GB} GB"
else
  echo "${SIZE_MB} MB"
fi
```

Implementation (JavaScript):
```javascript
const sizeMB = Math.floor(sizeBytes / 1024 / 1024);
if (sizeMB >= 1024) {
  const sizeGB = Math.floor(sizeMB / 1024);
  return `${sizeGB} GB`;
} else {
  return `${sizeMB} MB`;
}
```

### Data Flow: Step Outputs vs Environment Variables
**Use step outputs for passing data between steps in the same job.**

Current approach (RECOMMENDED):
- Use `${{ steps.step_id.outputs.value }}` for data flow
- Explicit, traceable, and follows GitHub Actions best practices
- Values: old_version, new_version, old_filesize, new_filesize, download_date, zip_size

When environment variables would be better:
- Multiple jobs need the same data (we have only one job)
- A value is used 10+ times (ours are used 2-3 times each)
- External scripts need access (we have no external scripts)

**Decision**: Keep step outputs unless requirements change significantly.

## Repository Purpose

This repository is an **automated mirror** of the Battlefield Portal SDK from EA/DICE. It serves as:

1. **Clean SDK Mirror**: The repository root contains ONLY the unmodified SDK files from the official ZIP
2. **Version Tracker**: Maintains history of all SDK versions released with size and date metadata
3. **Change Analyzer**: Generates comparisons and changelogs between versions with file size and line change tracking
4. **Integration Hub**: Triggers updates in dependent repositories when new versions are detected

## Repository Structure Philosophy

### Root Directory (/) - SDK FILES ONLY
- Contains ONLY files extracted from the official `PortalSDK.zip`:
  * `code/` - SDK source code
  * `FbExportData/` - Frostbite export data
  * `GodotProject/` - Godot project files
  * `mods/` - Mod files
  * `python/` - Python scripts (part of SDK)
  * `sdk.version.json` - Version metadata (part of SDK)
- NO additional documentation files (README.md, SETUP.md, etc.)
- NO automation folders
- NO configuration files
- This keeps the repository as a pure mirror of the official SDK

### .github/ Directory - ALL AUTOMATION
Everything automation-related lives here (NOT in separate automation/ folder):
- `config.json` - Configuration for schedules, URLs, and target repositories
- `cache/` - Generated comparison data and temporary files (in .gitignore)
- `workflows/sdk-check-updates.yml` - **CRITICAL**: Main automation workflow (NEVER DELETE)
- `copilot-instructions.md` - This file

NOTE: Version checking and changelog generation are done INLINE in the workflow using bash scripts and `actions/github-script`. No separate .js files needed.

## Workflow Overview

### Schedule
The workflow uses a **smart adaptive schedule** with tiered boost modes:

**Normal Schedule** (configured in `config.json`):
- **Monday**: Every hour between 8 AM - 8 PM UTC
- **Tuesday**: Every hour between 8 AM - 8 PM UTC
- **Wednesday-Friday**: Every 4 hours
- **Saturday-Sunday**: Every 6 hours

**Tiered Boost System** (automatic game update detection):

**Tier 1 - Aggressive Boost** (SteamDB):
- **Trigger**: Game update detected on SteamDB (https://steamdb.info/app/2807960/history/)
- **Duration**: Active for 8 hours after detection
- **Frequency**: Every 30 minutes on weekdays (Mon-Fri), any time of day
- **Reason**: SDK usually releases within hours of game update
- **Manual Override**: Can manually update cache to trigger aggressive boost
- **Falls back to**: Normal boost after 8 hours

**Tier 2 - Normal Boost** (EA Blog):
- **Trigger**: Game update on EA news page (https://www.ea.com/games/battlefield/battlefield-6/news)
- **Duration**: Active for 72 hours (3 days) after detection
- **Frequency**: Every 1 hour on weekdays (Mon-Fri), any time of day
- **Detection**: Monitors for updates mentioning "portal" or "sdk"
- **Falls back to**: Regular schedule after 72 hours

**Tier 3 - Regular Schedule**:
- No recent game updates detected
- Follows normal schedule (Mon/Tue hourly 8-20, Wed-Fri every 4h, Sat-Sun every 6h)

**Manual Trigger** (workflow_dispatch):
- **Priority**: Highest - bypasses ALL schedule checks
- **Behavior**: Immediately checks SDK version regardless of:
  - Work hours (Mon/Tue 8-20 restriction)
  - Boost mode status
  - Game update detection
  - Day of week
- **Use case**: When you know an update is available and want immediate check
- **Trigger**: GitHub Actions UI → "Run workflow" button

**Cache & Version Tracking**:
- Stores game update info in `.github/cache/game-update-tracker.json`
- Links game versions with SDK versions
- Tracks SteamDB updates (game version, build ID)
- Tracks EA blog updates (post titles, dates)
- Maps SDK updates to corresponding game versions

**Circuit Breaker** (Failure Protection):
- **Purpose**: Prevents spam when something is broken
- **Trigger**: 3 failed workflow runs on the same day
- **Behavior**: Pauses automatic checks until tomorrow
- **Bypass**: Manual triggers always bypass circuit breaker
- **Tracking**: Stores failure count in `.github/cache/failure-tracker.json` (committed to git)
- **Reset**: Counter resets on successful run or when date changes
- **Status**: Shows failure count and circuit breaker state in logs

### Process When Update Detected

1. **Circuit Breaker Check**
   - Checks if 3+ failures occurred today
   - If yes and automatic trigger: Exit early with message
   - If manual trigger: Bypass check completely
   - Tracks failures in committed cache file

2. **Game Update Detection** (Tiered - Boost Mode)
   - **Tier 1**: Checks SteamDB for game version updates (aggressive boost if within 8h)
   - **Tier 2**: Checks EA Battlefield news page (normal boost if within 72h)
   - **Tier 3**: Regular operation (no recent game updates)
   - Stores last known game update dates and versions in cache
   - Enables appropriate boost level based on recency
   - Links game versions with SDK versions for tracking
   - Overrides normal schedule restrictions when boosted

2. **Version Check** (Inline bash in workflow)
   - Uses `curl` to fetch `versions.json` from EA servers
   - Uses `jq` to parse JSON and compare with local `sdk.version.json`
   - Detects updates by version number OR filesize change
   - Outputs: update_needed, old_version, new_version, old_filesize, new_filesize
   - No external scripts needed - all done inline in workflow

3. **SDK Download**
   - Uses `wget` to download `PortalSDK.zip` from EA servers
   - Captures actual ZIP file size using `stat` command
   - Calculates size in MB using `bc` for human-readable output
   - Captures download date/time
   - Outputs: download_date, zip_size (bytes), zip_size_mb

4. **File Replacement**
   - Extracts new SDK ZIP to temporary location
   - Uses `rsync --checksum --delete` to sync only changed files
   - Excludes large build artifacts and runtime files (see File Exclusions section)
   - Repository root contains ONLY modified SDK files
   - Optimized: unchanged files preserve original timestamps

5. **File Comparison Generation (Git-based)**
   - Uses `git diff` to efficiently detect changes
   - Tracks file statistics:
     * Files added (new files)
     * Files deleted (removed files)
     * Files modified (content changed)
   - Excludes large build artifacts and runtime files
   - Optimized for speed (<5 minutes vs 20+ minutes)
   - Saves to `.github/cache/comparison.json` with structure:
     ```json
     {
       "old_version": "1.1.3.0",
       "new_version": "1.1.4.0",
       "timestamp": "2026-02-17T15:00:00Z",
       "summary": {
         "new_file_count": 1234,
         "added_count": 15,
         "deleted_count": 2,
         "modified_count": 8,
         "note": "Excludes .gd, .glb files and GodotProject runtime folders"
       }
     }
     ```

6. **AI Changelog Generation** (`actions/github-script@v7` with Gemini API)
   - Uses **Google Gemini 1.5-flash API** (NOT OpenAI)
   - Implemented inline using `actions/github-script` with direct API calls
   - **Non-blocking**: Uses `continue-on-error: true` for resilience
   - If GEMINI_API_KEY available: Uses comprehensive AI prompt (500+ words)
   - AI Prompt includes:
     * Context: This is Battlefield Portal SDK for game mode creators
     * Goal: Analyze what changed and what developers need to know
     * Instructions to identify patterns, not just list files
     * File statistics from comparison
     * Emphasis on developer-relevant changes
   - If no API key: Silently falls back to basic changelog (non-breaking)
   - Basic changelog includes:
     * Version numbers and dates
     * File counts (added/deleted/modified)
   - Uses native `fetch` API in GitHub Actions environment

7. **Pre-Update Release Creation**
   - Creates a release/tag of the CURRENT state before updating
   - Tag format: `portal-sdk_v{current_version}`
   - ZIP contains only SDK files from root (excludes .github/, .git/)
   - Release notes include:
     * Current version number
     * ZIP file size
     * Download date
   - Preserves history of each version

8. **GitHub Issue Creation**
   - Automatically creates issue with title: "SDK Update: v{old} → v{new}"
   - Issue body includes:
     * Version information (old → new)
     * Download date and time
     * ZIP size comparison (old vs new in MB)
     * File statistics (added/deleted/modified)
     * Complete AI or basic changelog
     * Size information for changed files
     * Line change counts for text files
   - Labels: `sdk-update`, `automated`

9. **Cross-Repository Triggering**
   - Sends `repository_dispatch` event to configured target repo
   - Payload includes:
     * Old and new version numbers
     * Old and new ZIP filesizes
     * Download date
     * Raw comparison JSON with all file details
     * AI-generated changelog
     * PR number and URL
     * Issue number
     * Timestamp
   - Target repo configured in `.github/config.json`

10. **Create Branch and Pull Request**
   - Creates new branch: `sdk-update-v{version}`
   - Commits all changes with message: "Update Portal SDK to v{version}"
   - Pushes branch to origin
   - Creates Pull Request to main branch with:
     * Version comparison
     * File statistics
     * Full changelog
     * Links to releases
   - Keeps git history clean and allows review before merging
   - Workflow completes (merge is manual or via auto-merge)

## Configuration

### .github/config.json
```json
{
  "schedule": {
    "monday": {
      "interval_hours": 1,
      "work_hours": { "start": 8, "end": 20 },
      "timezone": "UTC"
    },
    "tuesday": {
      "interval_hours": 1,
      "work_hours": { "start": 8, "end": 20 },
      "timezone": "UTC"
    },
    "wednesday": { "interval_hours": 4 },
    "thursday": { "interval_hours": 4 },
    "friday": { "interval_hours": 4 },
    "saturday": { "interval_hours": 6 },
    "sunday": { "interval_hours": 6 }
  },
  "urls": {
    "versions": "https://download.portal.battlefield.com/versions.json",
    "sdk_download": "https://download.portal.battlefield.com/PortalSDK.zip"
  },
  "github": {
    "issue_labels": ["sdk-update", "automated"],
    "target_repo": "YOUR_ORG/target-repo",
    "trigger_workflow": "sdk-updated.yml"
  },
  "release": {
    "tag_prefix": "portal-sdk_v",
    "create_github_release": true
  }
}
```

### Target Repository Setup
To receive update notifications in another repo:

1. Set `github.target_repo` in `.github/config.json` to `"your-org/your-repo"`
2. In target repo, create workflow file `.github/workflows/sdk-updated.yml`:

```yaml
name: SDK Updated
on:
  repository_dispatch:
    types: [sdk-updated]

jobs:
  handle-update:
    runs-on: ubuntu-latest
    steps:
      - name: Process SDK update
        run: |
          echo "Old version: ${{ github.event.client_payload.old_version }}"
          echo "New version: ${{ github.event.client_payload.new_version }}"
          echo "Source repo: ${{ github.event.client_payload.source_repo }}"
          echo "Pull Request: ${{ github.event.client_payload.pr_url }}"
          echo "Issue: ${{ github.event.client_payload.issue_number }}"
          
          # Access comparison data
          echo "${{ github.event.client_payload.comparison_raw }}" > comparison.json
          
          # Access AI changelog
          echo "${{ github.event.client_payload.changelog_ai }}" > changelog.md
```

## Key Design Principles

### 1. Root Directory is Sacred - SDK FILES ONLY
- Root contains ONLY official SDK files from the ZIP
- NO README.md, NO SETUP.md, NO documentation files
- NO automation folders (everything goes in .github/)
- NO configuration files (config.json is in .github/)
- Makes it easy to diff against official releases
- Clean for other repos to use as submodule or comparison base

### 2. ALL Automation in .github/
- **DO NOT create automation/ folder** - We have .github/ already
- Config goes in .github/config.json
- Cache goes in .github/cache/
- Workflows go in .github/workflows/
- All logic is inline in workflow (bash + actions/github-script)
- This is standard practice and avoids folder redundancy

### 3. Minimal External Dependencies
- Version checking: Inline bash with `curl`, `jq`, standard shell commands
- Changelog generation: `actions/github-script@v7` with native `fetch()` API
- File operations: Native shell commands (wget, unzip, rsync, stat, bc)
- No external Node.js scripts needed
- No Python dependencies
- Simpler, faster, minimal dependencies

### 4. Comprehensive Size and Date Tracking
- ZIP filesize tracked for every version (bytes and MB)
- Download date and time captured
- Individual file sizes tracked in comparisons
- Line change counts for text files
- Size differences highlighted in changelogs

### 5. Enhanced File Comparison
- Detects text files (.json, .xml, .txt, .md, .gd, .py, .js, .ts, etc.)
- Counts line changes for text files (added/removed)
- Tracks file sizes for all files
- Identifies patterns in changes
- Helps developers understand impact

### 6. Google Gemini AI Integration
- Uses Gemini 1.5-flash (NOT OpenAI)
- Comprehensive 500+ word prompt with:
  * SDK context and purpose
  * Developer-focused analysis instructions
  * Pattern identification (not just file listing)
  * Impact assessment guidelines
- Silently falls back to basic changelog if no API key
- Non-breaking: workflow continues without AI

### 7. Automated Issue Creation
- Every update creates a tracking issue
- Includes ZIP size comparison
- Includes download date
- Full changelog with file sizes and line changes
- Provides visibility into what changed

### 8. Cross-Repository Integration
- `repository_dispatch` events to trigger workflows elsewhere
- Passes comprehensive metadata (sizes, dates, versions)
- Passes both raw data and AI analysis
- Allows dependent repos to react to updates automatically

### 9. The Workflow File is Critical
- `.github/workflows/sdk-check-updates.yml` is THE ONLY THING REALLY NEEDED
- NEVER delete or attempt to remove the workflow file
- It orchestrates everything
- Without it, nothing works

## Common Use Cases

### For AI Assistants

When asked to:

**"Update the configuration"**
- Edit `.github/config.json` (NOT automation/config.json)
- Do NOT edit files in root
- Do NOT create automation/ folder

**"Check what changed in the latest SDK"**
- Read `.github/cache/comparison.json`
- Look at latest GitHub issue with `sdk-update` label
- Check git log for latest commit message

**"Add files to the SDK"**
- DO NOT do this! Root is for SDK files only
- If adding automation logic, put in `.github/workflows/` (inline)
- If adding docs, update this copilot-instructions.md file
- NEVER add README.md, SETUP.md, or other docs to root

**"Change the schedule"**
- Edit `.github/config.json` (work hours)
- Edit `.github/workflows/sdk-check-updates.yml` (cron schedules)
- Both must stay synchronized

**"See version history"**
- Check git tags (format: `portal-sdk_v{version}`)
- Look at GitHub releases (one per version)
- Each release includes ZIP size and download date

**"Compare two versions"**
- Each version is tagged in git
- Each version has a release
- Comparison JSON includes file sizes and line changes

**"Fix the workflow" or "Update automation"**
- Edit workflow file in `.github/workflows/` directory
- All logic is inline (bash + actions/github-script)
- NEVER delete the workflow file
- Check git status before modifying any files

**"Manually trigger aggressive boost mode"**
- Update `.github/cache/game-update-tracker.json` manually:
  ```json
  {
    "steamdb": {
      "last_update_date": "2026-02-17T14:00:00Z",
      "game_version": "1.2.3",
      "build_id": "12345678",
      "manual_trigger": true
    },
    "ea_blog": {...},
    "sdk": {...}
  }
  ```
- Commit the cache file update
- Workflow will enter aggressive boost (8h) on next run
- Alternative: Use workflow_dispatch to manually trigger a check

**"Remove unnecessary files"**
- ⚠️ STOP! Ask user to clarify which files
- Check git status first
- NEVER delete .github/workflows/ files
- NEVER delete .github/config.json

**"Clean up the repository"**
- DO NOT delete committed files
- DO NOT remove configuration
- DO NOT suggest removing the workflow
- Only suggest removing truly temporary/cache files

**"Why is there an automation/ folder?"**
- There SHOULDN'T be one anymore
- Everything moved to .github/
- If it exists, it's a mistake from old structure

**"Why are there markdown files in root?"**
- There SHOULDN'T be any
- Root = SDK files only
- If they exist, they need to be removed (if committed and user approves)

### For Developers

**"How do I use this in my project?"**
- Add as git submodule for clean SDK baseline
- Use the repository_dispatch feature to trigger your workflows
- Subscribe to GitHub issues for update notifications
- Download specific version from releases

**"How do I know when SDK updates?"**
- Watch the repository
- Subscribe to issues with `sdk-update` label
- Configure `github.target_repo` to trigger your repo's workflow
- Check releases for new versions

**"Can I modify the SDK files?"**
- Not in this repo - it's a mirror
- Fork or clone for modifications
- This repo serves as the official baseline

**"What information is available about each update?"**
- Version numbers (old → new)
- ZIP file sizes (old and new in bytes/MB)
- Download date and time
- File-by-file changes (added/deleted/modified)
- File sizes for each changed file
- Line change counts for text files
- AI analysis of changes (if Gemini key available)

## Secrets Required

### Optional but Recommended:
- `GEMINI_API_KEY` - For AI-powered changelog generation (Google Gemini 1.5-flash)
  - Without it: Creates basic file-list changelogs with sizes
  - With it: Creates intelligent, contextual changelogs with pattern analysis
  - Workflow continues regardless (non-breaking)

### NOT Used Anymore:
- `OPENAI_API_KEY` - Removed, using Gemini instead

## Maintenance

### Regular Tasks:
- Review generated issues and changelogs
- Monitor workflow runs for failures
- Check disk usage (SDK can be large, ~6GB+)
- Update `target_repo` config when needed
- Verify .github/cache/ is properly ignored in git

### When EA Changes URLs:
- Update `urls` in `.github/config.json`
- Test with manual workflow run
- No code changes needed

### Adding New Automation:
- Edit `.github/workflows/sdk-check-updates.yml` (all logic is inline)
- Use bash for simple operations (curl, jq, etc.)
- Use `actions/github-script` for complex logic or API calls
- Keep root directory clean (SDK files only)
- Test thoroughly before committing

## File Exclusions

Files/folders ALWAYS excluded from root SDK extraction:
- `.github/` - GitHub automation (workflows, config, cache)
- `.git/` - Git metadata
- `.gitignore` - Git configuration

SDK-specific exclusions (performance optimization):
- `GodotProject/scripts/` - Runtime scripts (regenerated by Godot)
- `GodotProject/addons/bf_portal/` - Portal addon (large, rarely changes)
- `GodotProject/addons/scene-library/` - Scene library (large, build artifact)
- `GodotProject/raw/` - Raw assets (very large, build artifact)
- `GodotProject/.godot/` - Godot cache/build files
- `*.gd` - GDScript files (large, can be excluded per reference repo)
- `*.glb` - Binary 3D models (very large)
- `*.exe` - Godot executable (tracked via .version file instead)
- `GodotProject/.objects/**/*.tscn` - Object scene files in .objects folder

Special handling:
- `Godot*.exe` - Excluded from commits but version tracked
  * Workflow detects any `Godot*.exe` in SDK root
  * Creates corresponding `.version` file (e.g., `Godot_v4.4.1-stable_win64.version`)
  * Version file contains the exe filename for reference
  * Allows tracking which Godot version without committing 150+ MB binary

Rationale:
- Reduces workflow time from 20+ minutes to <5 minutes
- Excludes build artifacts and runtime-generated files
- Follows pattern from battlefield-portal-community/PortalSDK
- Godot exe tracked by name (not binary) to avoid bloating repository
- Files still tracked in official ZIP for download

These are never included in:
- Root directory SDK extraction
- Git commits
- Comparisons between versions

Do NOT exclude from root during SDK extraction:
- `sdk.version.json` - Part of the SDK
- `code/`, `FbExportData/`, `mods/`, `python/` - SDK folders
- `GodotProject/` (folder itself) - only subfolders excluded

## Version Format

SDK versions follow: `MAJOR.MINOR.PATCH.BUILD`
Example: `1.1.3.0`

Comparison logic:
- Compares numeric parts left to right
- `1.1.4.0` > `1.1.3.0`
- Also checks filesize for same version
- `1.1.3.0` (6GB) ≠ `1.1.3.0` (6.1GB) → Triggers update
- Update triggered if version OR filesize changes

## Error Handling

The workflow is designed to be resilient:
- If Gemini API unavailable → Falls back to basic changelog, continues
- If changelog generation fails → Uses basic template, continues
- If release creation fails → Logs error, continues with update
- If target repo trigger fails → Logs warning, continues
- Updates are never blocked by non-critical failures
- Errors are logged but don't stop the core mirror functionality

## Implementation Details

### Workflow

**`.github/workflows/sdk-check-updates.yml`**
- Runs on schedule (cron) and manual trigger (workflow_dispatch)
- All logic implemented inline - no external scripts
- Steps:
  1. Checkout repository
  2. Check work hours (Mon/Tue only)
  3. **Version check** (inline bash):
     - Fetches remote versions.json with `curl`
     - Parses JSON with `jq`
     - Compares version and filesize
     - Outputs: update_needed, old_version, new_version, old_filesize, new_filesize, update_reason
  4. Skip if no update needed
  5. Create release/tag of current version
  6. Download SDK ZIP, capture size and date
  7. Create backup of current files
  8. Remove old SDK files from root
  9. Extract new SDK ZIP to root
  10. Generate detailed file comparison with sizes/lines
  11. **Changelog generation** (`actions/github-script@v7`):
      - Calls Gemini 1.5-flash API directly via `fetch()`
      - Comprehensive prompt with SDK context
      - Falls back to basic changelog if no API key
  12. Commit and push changes
  13. Create GitHub issue with all metadata
  14. Trigger target repository via repository_dispatch

### File Comparison Logic
```bash
# Detects text files by extension
is_text_file() {
  [[ "$1" =~ \.(json|xml|txt|md|gd|py|js|ts|css|html|yml|yaml|ini|cfg|conf)$ ]]
}

# Counts line changes for text files
if is_text_file "$file"; then
  lines_changed=$(diff -u old new | grep -cE '^[+-]' || echo "0")
fi

# Tracks file sizes for all files
size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null)
```

## Important Reminders for AI Assistants

### DO:
✅ Keep root directory clean (SDK files only)
✅ Put all automation in .github/
✅ Track file sizes, ZIP sizes, dates
✅ Use Gemini API (not OpenAI)
✅ Check git status before file operations
✅ Verify files are committed before suggesting deletion
✅ Preserve the workflow file at all costs

### DO NOT:
❌ Create automation/ folder (use .github/)
❌ Create separate .js script files (use inline bash or actions/github-script)
❌ Add documentation files to root (README, SETUP, etc.)
❌ Delete the workflow file
❌ Delete .github/config.json
❌ Delete uncommitted files
❌ Remove files without user confirmation
❌ Use OpenAI API (switched to Gemini)
❌ Reference automation/ paths (everything is in .github/ now)

## Troubleshooting

**"Workflow fails at version check"**
- Check .github/config.json exists and has correct URLs
- Verify sdk.version.json exists in repository root
- Check network connectivity to EA servers

**"Changelog generation fails"**
- If no GEMINI_API_KEY: This is normal, uses basic changelog
- If API key exists: Check API key validity and quota
- Workflow continues regardless, changelog may be basic

**"File comparison shows unexpected changes"**
- Check .gitignore excludes .github/cache/*
- Verify SDK extraction didn't overwrite automation files
- Confirm file exclusions in workflow are correct

**"Target repository not receiving dispatch"**
- Check target_repo in .github/config.json is correct format
- Verify target repo has Personal Access Token with repo scope
- Check target repo has workflow listening for sdk-updated event

---

**Last Updated**: 2026-02-17
**Repository**: Battlefield Portal SDK Mirror
**Structure Version**: 3.3 (Circuit breaker, PR workflow, optimized file extraction)
**Implementation**: Inline bash + actions/github-script (no external scripts)
**AI Provider**: Google Gemini 1.5-flash
