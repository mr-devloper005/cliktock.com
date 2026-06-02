# CLIKTOCK Editable Manifest

This folder contains the editable UI layer for the public site experience.

The redesign keeps route behavior, data fetching, task support, and backend logic outside this folder unchanged. Editable files are responsible for presentation, copy, reusable cards, page shells, empty/loading states, and route-specific visual layouts.

Current visual direction:

- Dark premium star-field interface with green action accents.
- Floating compact navigation and fine bordered content panels.
- Search-first discovery for saved resources, profiles, and public posts.
- Varied card treatments for featured, compact, horizontal, editorial, and image-first contexts.
- Safe rendering when optional image, category, summary, or media fields are missing.

Do not move API logic, server routes, database calls, or core task wiring into this folder.
