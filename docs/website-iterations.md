# Website iteration inventory

Checked 2026-09-20. Primary working folder: `/Volumes/Kartar Projects/Documents/Website/sachmeetsb.github.io`.

## Published baseline

This checkout was fast-forwarded from `723584bc` (2025-07-07) to `a62e625a` (2026-09-14), bringing in 36 commits from GitHub main. The latest deployment succeeded. The live homepage matches the published Pages HTML apart from Cloudflare email protection.

## Other local iterations

| Location under Documents | State | Unique work |
| --- | --- | --- |
| `Kartar2/Website/sachmeetsb.github.io` | `837e891f`, 2026-06-25 | Older checkout. Untracked GLM proxy and local assistant configuration; no tracked website edits. |
| `Kartar3/Website/sachmeetsb.github.io` | `a62e625a`, 2026-09-14, with unpublished edits | Menger-sponge hero replacing the tree; NyayaBox catalogue/context/industry entry; product ordering; branching-tree geometry improvements and related tests. |
| `Kartar-LinkedIn/Website-Demos-2026-09-09` | Exported demo assets | All 12 files are byte-identical to this checkout's public/media/demos files. |

Kartar3 also contains untracked BookingForm and Studio components, booking-service, operations files, and a Naina update script. Studio and BookingForm are not connected to the main application. Generated builds, temporary output, browser captures, and local settings are also present. These are not imported into this checkout: unpublished experiments should be reviewed as a coherent change before adopting them.

## Decision and verification

Sachmeet chose to keep this checkout on the latest GitHub version and document unpublished work, without importing it. All 33 existing Node tests pass. Dependencies were reinstalled from package-lock.json; Vite production compilation and static generation of 12 product pages succeeded in a temporary directory. Tracked source and build files remain identical to origin/main.

## Local preservation

The pre-existing upscaled logo is unchanged. Local Finder metadata was backed up, stashed before the fast-forward, and restored as an ignored file (upstream removed it from tracking). The named Git stash remains available.

## Future updates

Use this folder as the working checkout. Fetch origin, inspect local changes, then fast-forward main with `git merge --ff-only origin/main`. Preserve local edits first if they overlap. Check this inventory before bringing work across from another iteration. This file is a dated inventory, not an automatic synchronization service.


## Integration on 2026-09-21

Sachmeet subsequently approved merging the unpublished website changes. Imported the active Menger-sponge hero, portfolio ordering, NyayaBox catalogue/context/industry entry, branching-tree improvements, and corresponding tests. Retained the current checkout's inline voice-answer edits. Added a small orange gradient core at the cube's projected center. Unconnected Studio/booking-service experiments, local settings, captures and temporary output remain in Kartar3. Generated assets are rebuilt from the merged source rather than copied from the older build.


## Release validation

The merged hero now uses a model-space sphere with shared depth sorting, a three-second orange pulse, full 360-degree pointer sweeps, and drag rotation while paused. Hero/navigation text is unselectable. The contact form keeps speech in its editable field by default and offers inline Keep/Discard controls. All 53 Node tests pass; production generation produces 13 product pages. Browser checks cover voice editing/discard/default retention, sphere occlusion/pulsing, and pause/drag/resume. The local Chrome drawing benchmark averaged about 0.5 ms per frame; this is a local measurement, not a cross-device performance guarantee.
