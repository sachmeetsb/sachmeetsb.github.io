# Demo check — 9 September 2026

**Published and verified at https://kartar.ai/ on 9 September 2026.** **12 listed projects, 11 recorded demos.** Six recordings added; the five existing recordings preserved. Release commit: `ad0db4c0`.

## Added recordings

Real browser-frame walkthroughs encoded as silent H.264 MP4s at 1280 × 720. Source capture is sampled (approximately 10 fps for the five website captures; 2.6 fps for TT Coach), not full-frame-rate screen/audio recording. No generated UI or invented results. Each has a poster and measured chapter stops.

| Project | Recorded flow | Duration | App access / limits |
| --- | --- | --- | --- |
| Khoj Learning | Prepared algebra question and Mira answer → Listen → Lab area model → reveal proof | 29s | https://khoj-learning.exe.xyz/; fictional learner/sample progress. Muted footage does not prove speaker/microphone quality. |
| Satya Social | Opinion demo post → demo profile → text composer → cancel | 23s | https://pds.kartar.ai/; nothing posted. Media, translation and identity verification not demonstrated. |
| QuantumExp | Three-qubit Grover setup, marked state 5 → live run → circuit and P(marked)=0.945 | 20s | https://kartar-quantumexp.exe.xyz/; simulation, not quantum hardware. Translator not demonstrated. |
| NyayaLegal | Saved bail research → cited Mahipal judgment → selected source passage and notes | 22s | https://yukti.kartar.ai/; signed-in account. Account details/recent conversation names masked. Answers and source OCR require review. |
| Kartar Media | English → Hindi → Punjabi editions → editorial script/sources → comments preview | 36s | https://kartar-media-production.up.railway.app/; curated dated editions, not continuous live news. AI presenter disclosed. Nothing posted. |
| TT Coach | Reviewed replay → five-bounce map → 4.08s bounce → source frame 204/calibration → practice feedback | 31s | Original local reviewed-result tab. No public Open app. Three reviewed returns support limited feedback; positions approximate. |

User approved sequences and TT Coach broadcast footage before capture. TT Coach's task recovered its original result tab; no capability extraction, report changes or new analysis were required. Verified source: `Kartar-LinkedIn/TableTennis/table-tennis-reviewed-demo-2026-09-09-native.mp4`. Earlier non-native export omitted the match image and was not used.

## Catalogue decisions

- NewsTime renamed **Kartar Media** in the catalogue, footer, title and metadata. Existing `/products/newstime/` URL retained to avoid broken links.
- **ProdVTON hidden** until Sachmeet supplies its demo; source entry/assets preserved.
- **CustomsIQ remains in development**, without recording, explicitly deferred.
- ArtRenamer, Wingmen, Rezt and Speko remain excluded.
- Vimarsha Open app: https://kartar-vimarsha.exe.xyz/. Existing recording preserved.
- Other retained videos: LawyerBoss, InstantConfig, DataMind and VR Real Estate Walkthrough.
- Notion-derived stages unchanged. User-directed names/newer task handoffs identify current previews; working demos do not imply production readiness.

## Evidence and verification

- New deliverables: `public/media/demos/{khoj-learning,satya-social,quantumexp,nyayalegal,kartar-media,tt-coach}.{mp4,jpg}`.
- Permanent archive: `/Users/sachmeet/Documents/Kartar-LinkedIn/Website-Demos-2026-09-09/`.
- Timestamps/raw frames/QA: `/Users/sachmeet/.codex/visualizations/2026/08/09/019fe63b-7fe9-7a42-9937-1c99fc17aa5c/website-audit/demo-capture/`. Raw NyayaLegal frames are private working artifacts; only masked encodes are in the website/archive.
- Encoded frames inspected for the model, language switches, sources, comments preview, notes and reviewed TT events.
- Build passes, generating 12 product pages. All 16 startup, voice and website revision tests pass, including video/poster existence and ordered chapter times.
- All six new videos loaded in the site player with readyState=4, advancing currentTime and no media error. TT Coach paused at its 10s chapter and continued with the Space key. At 390px viewport width the document had no horizontal overflow and its video remained within the page.
- The earlier HTTP 403 was resolved after the user's access update. The configured CLI then authenticated as `sachmeetsb` with write access; no credentials were extracted or manually switched. Release `ad0db4c0` was pushed successfully to main.
- GitHub workflow [34365968553](https://github.com/sachmeetsb/sachmeetsb.github.io/actions/runs/34365968553) and Pages run [34366022423](https://github.com/sachmeetsb/sachmeetsb.github.io/actions/runs/34366022423) both completed successfully. Published `gh-pages` revision: `c17c2b584df0241658262388947b703e2686e050`. Prior published revision/rollback reference: `af7378384046e46a78ec4a3345209634e549e17d`. Rollback was identified, not exercised against production.
- `node scripts/verify-live-demos.mjs` passed against https://kartar.ai/: all 12 product pages returned 200; all 11 MP4s and 11 posters matched local SHA256 checksums; the catalogue and sitemap exclude the five withdrawn slugs and their routes return 404. The existing NewsTime URL correctly displays Kartar Media.
- All 11 recordings were individually selected in the public homepage player: readyState=4, positive currentTime, no media error. CustomsIQ displays a disabled coming-soon preview. The live Vimarsha Open app link points to its verified web reader. Browser console reported no errors during these checks.
- Unrelated booking-service and Studio drafts remain untouched and outside the release. The custom booking backend was not deployed; calendar-account setup and microphone end-to-end checks are separate from this demo release.

The approved demo batch is published with no remaining demo-release blockers. CustomsIQ is deferred; ProdVTON is hidden pending user footage.
