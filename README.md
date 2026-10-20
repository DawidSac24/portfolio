# Dawid Sac — Portfolio

Personal portfolio website for showcasing my work in embedded systems, firmware, electronics, and software. It combines project write-ups with interactive 3D visuals and a custom ASCII post-processing effect.

**Live site:** [dawid-sac.dev](https://dawid-sac.dev/)  
**Resume:** [View the PDF](public/resume.pdf)

## Highlights

- Profile, education, and experience presented as scroll-snapping sections.
- Dedicated project pages for [SmartFrame](#smartframe) and [Auto-Mate](#auto-mate), with technical details and media galleries.
- A resume viewer embedded in the site.
- Interactive Three.js scenes, including an ASCII-rendered portrait and Saturn model.
- Responsive layouts for desktop and mobile.

### This portfolio

An interactive 3D web portfolio with a modular, engine-like architecture, event handling, custom shaders, and detailed project pages.

**Technologies:** TypeScript, React, Three.js, HTML, CSS

## Technology

- React 19 and TypeScript
- Vite
- React Router
- Three.js with React Three Fiber / Drei dependencies
- CSS Modules
- Radix UI Tabs and Lucide icons

## Getting started

Requires Node.js 20 or later and npm.

```bash
npm ci
npm run dev
```

Vite prints the local development URL in the terminal.

## Available scripts

| Command           | Purpose                                                             |
| ----------------- | ------------------------------------------------------------------- |
| `npm run dev`     | Start the Vite development server                                   |
| `npm run build`   | Run the TypeScript project build, then create the production bundle |
| `npm run lint`    | Lint the repository with ESLint                                     |
| `npm run preview` | Preview the production build locally                                |

There is currently no test runner configured.

## Architecture

The site is a React application, but its interactive 3D content is organized as a small engine rather than being constructed directly inside page components. The engine separates rendering, scene composition, reusable exhibits, asynchronous construction, asset ownership, and post-processing.

### Application and page composition

- `src/main.tsx` mounts the app and global styles. `src/App.tsx` declares the React Router routes inside a shared layout and navigation provider.
- Each profile or project page composes its content from section components. Profile sections use `SnapScroller`; project pages use `StickyScroller`, which pairs a sticky visual stage with snapped narrative sections.
- Pages publish section IDs and labels through the shared navigation context. The IDs must match the rendered section elements so the navigation can observe and scroll to them.
- Reusable UI, navigation, and visual components live in `src/components/`. Page-specific copy and layout are kept with their page under `src/pages/`.

### 3D rendering lifecycle

`Viewport3D` owns the browser-facing WebGL lifecycle for each canvas. It creates a renderer, attaches it to its container, and runs a `requestAnimationFrame` loop that updates and renders the active scene. A `ResizeObserver` keeps the renderer, camera aspect ratio, post-processing resolution, and effect composer in sync with the container. An `IntersectionObserver` pauses frame updates while the viewport is off-screen. Pointer events on the canvas are normalized and forwarded to scene effects; cleanup cancels the animation loop, disconnects observers, removes listeners, and disposes renderer resources.

Scenes are assembled in `src/engine/scenes/`. A `Scene` owns a Three.js scene and camera, tracks its exhibits and post-processing effects, and provides lifecycle hooks for entering, exiting, updating, and disposal. Each frame it updates the scene subclass, its exhibits, and its effects. Lighting rigs can be applied when assembling scenes.

### Exhibits, builders, and decorators

An `Exhibit` wraps a renderable Three.js object and defines per-frame update and disposal behavior. Concrete exhibits adapt loaded assets into project-specific objects—for example, image planes or the rotating Saturn model.

`ExhibitBuilder` constructs exhibits asynchronously:

1. It asks `AssetManager` to acquire the source asset by URL.
2. It passes that asset and constructor arguments to the selected exhibit class.
3. Optional decorators are applied in registration order, wrapping the exhibit in additional behavior.

`ExhibitDecorator` delegates mesh access and updates to the wrapped exhibit, and forwards disposal down the wrapper chain. This lets effects such as outlines or interactive ASCII behavior be composed around an exhibit without folding all behavior into the base exhibit class.

### Asset and scene managers

`AssetManager` is a singleton loader registry for model and texture formats. It caches loaded Three.js assets in a `RefCountCache`: exhibit construction acquires a reference, and disposal releases it. When the reference count reaches zero, the cache callback disposes the texture or traverses model meshes to dispose geometries, materials, and material textures.

`SceneManager` caches built scenes by scene ID in an `LRUCache` with a capacity of six. Access refreshes a scene’s recency; when the cache evicts the least recently used scene, its disposal callback runs the scene lifecycle, which disposes exhibits and releases their asset references. Use a stable scene ID for a reusable scene configuration, and include configuration changes in the ID when they require a distinct scene.

### Events and interaction

The engine event layer uses a singleton `EventBus` keyed by event class. Systems subscribe to typed event classes and receive matching emitted instances. `EventTracker` provides a lifecycle helper: subclasses register listeners with `listenTo()`, and `dispose()` invokes every unsubscribe callback it has collected. Keep subscriptions tied to an owner’s lifecycle to avoid stale listeners.

The 3D viewport also forwards normalized pointer movement directly to active scene effects through the `PostProcessEffect` interface. Effects can react to pointer movement, resize, and frame updates, and own disposal for their post-processing passes.

### Static assets

`public/` contains static images, models, videos, and the resume PDF. Reference them from the app using root-relative URLs such as `/images/automate.jpg`.

## Visuals

The repository currently includes project media used by the site, such as the Auto-Mate photo above and SmartFrame media in [`public/images/`](public/images/). A screenshot of the actual website would complement these: consider adding a desktop capture of the profile page and a mobile capture of a project page under a folder such as `docs/screenshots/`, then embedding them here with relative Markdown image links.
