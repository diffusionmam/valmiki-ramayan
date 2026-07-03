---

name: website-route-refactor
version: 1.0.0
description: Crawl a website, extract routes, infer structure, and generate an improved folder architecture with rebuilt route implementations.
inputs:
base_url:
type: string
required: true
framework_preference:
type: string
required: false
default: nextjs-app-router
language:
type: string
required: false
default: typescript
rendering_mode:
type: string
required: false
default: ssr
outputs:
type: json
schema:
original_routes: string[]
classified_routes:
static: string[]
dynamic: string[]
api: string[]
auth: string[]
improved_routes: string[]
folder_structure: string
files: object
-------------

# Skill: Website Route Extraction & Refactoring (OpenCode Compatible)

## Execution Contract

* Always return strictly valid JSON (no prose outside JSON)
* Do not hallucinate routes
* Deterministic transformations only
* Preserve functionality unless explicitly improved

---

## Pipeline

### step_1_discover_routes

**actions**

* crawl(base_url)
* extract_links(a.href)
* extract_forms(form.action)
* detect_api_calls(fetch, xhr)
* fetch_optional(/sitemap.xml)

**normalize_rules**

* remove query params except structural ones
* deduplicate
* resolve relative paths

**output**
{
"routes": string[]
}

---

### step_2_classify_routes

**rules**

* static: no params
* dynamic: contains variable segments
* api: starts with /api
* auth: requires session/cookie signals or common patterns (/dashboard, /account)

**transform**

* infer params:

  * numeric → {id}
  * slug-like → {slug}

**output**
{
"classified_routes": {
"static": string[],
"dynamic": string[],
"api": string[],
"auth": string[]
}
}

---

### step_3_infer_structure

**rules**

* parent = prefix match
* deeper path = child
* group by root segment

**output**
{
"tree": string
}

---

### step_4_improve_routes

**rules**

* enforce kebab-case
* remove query-based routing
* normalize dynamic segments
* collapse redundant paths

**examples**

* /p?id=123 → /products/123
* /Blog/Post → /blog/{slug}

**output**
{
"improved_routes": string[]
}

---

### step_5_generate_structure

**framework_rules (nextjs-app-router default)**

* each route → folder
* dynamic → [param]
* index → page.tsx

**output**
{
"folder_structure": string
}

---

### step_6_generate_files

**per_route_generate**

* page component
* data fetching
* metadata
* loading.tsx
* error.tsx

**constraints**

* use selected language
* follow framework conventions

**output**
{
"files": {
"path": "code"
}
}

---

## Final Output

Return merged result:

{
"original_routes": string[],
"classified_routes": {
"static": string[],
"dynamic": string[],
"api": string[],
"auth": string[]
},
"improved_routes": string[],
"folder_structure": string,
"files": {
"path": "code"
}
}

---

## Execution Order

1. step_1_discover_routes
2. step_2_classify_routes
3. step_3_infer_structure
4. step_4_improve_routes
5. step_5_generate_structure
6. step_6_generate_files

---

## End Skill



# Skill: Website Route Extraction & Refactoring

## Objective

Enable an AI agent to:

1. Scrape and analyze a target website.
2. Identify all navigable routes (pages, endpoints, dynamic paths).
3. Infer structure, hierarchy, and relationships between routes.
4. Generate a clean, modernized folder structure.
5. Produce improved versions of each route (code, layout, naming, and architecture).

---

## Input Requirements

The AI will receive:

* `base_url`: The root URL of the website to analyze.
* Optional:

  * `framework_preference` (e.g., Next.js, React Router, Express, Django)
  * `language` (e.g., TypeScript, JavaScript, Python)
  * `rendering_mode` (SSR, SSG, CSR)

---

## Step 1: Crawl & Discover Routes

### Goals

* Identify all reachable routes.
* Capture both static and dynamic paths.

### Actions

* Perform recursive crawling starting from `base_url`.
* Extract:

  * Anchor links (`<a href>`)
  * Form actions
  * API calls (XHR/fetch)
  * Sitemap.xml (if available)
* Normalize URLs:

  * Remove query noise
  * Deduplicate
  * Resolve relative paths

### Output Format

```json
{
  "routes": [
    "/",
    "/about",
    "/products",
    "/products/{id}",
    "/blog/{slug}"
  ]
}
```

---

## Step 2: Classify Routes

### Categories

* Static routes (fixed content)
* Dynamic routes (parameterized)
* API endpoints
* Auth-protected routes

### Heuristics

* Detect patterns like:

  * IDs → `/item/123`
  * Slugs → `/blog/my-post`
* Group similar routes into templates.

### Output

```json
{
  "classified_routes": {
    "static": ["/", "/about"],
    "dynamic": ["/products/{id}", "/blog/{slug}"],
    "api": ["/api/products"],
    "auth": ["/dashboard"]
  }
}
```

---

## Step 3: Infer Information Architecture

### Goals

* Build hierarchy
* Identify parent-child relationships

### Example

```
/products
  ├── /products/{id}
  └── /products/{id}/reviews
```

### Considerations

* Navigation menus
* Breadcrumbs
* URL depth

---

## Step 4: Design Improved Architecture

### Principles

* Consistency in naming
* Shallow, predictable structure
* Separation of concerns
* Scalability

### Improvements

* Replace ambiguous routes

  * `/p?id=123` → `/products/123`
* Normalize casing (kebab-case preferred)
* Consolidate redundant routes

---

## Step 5: Generate Folder Structure

### Example (Next.js App Router)

```
/app
  /page.tsx
  /about/page.tsx
  /products
    /page.tsx
    /[id]
      /page.tsx
      /reviews/page.tsx
  /blog
    /page.tsx
    /[slug]/page.tsx
```

### Rules

* Each route maps to a folder
* Dynamic segments use brackets
* Shared layouts extracted

---

## Step 6: Rebuild Route Implementations

### For Each Route

Generate:

* Page/component file
* Data fetching logic
* Metadata (SEO)
* Error/loading states

### Improvements to Apply

* Modern patterns (hooks, server components)
* Accessibility fixes
* Performance optimizations
* Clean separation of UI and logic

---

## Step 7: Output Deliverables

### 1. Route Map

* Full list of original routes

### 2. Improved Route Map

* Cleaned and standardized version

### 3. Folder Structure

* Tree representation

### 4. Code Files

* One file per route

### Example Output

```json
{
  "original_routes": [...],
  "improved_routes": [...],
  "folder_structure": "...",
  "files": {
    "app/products/[id]/page.tsx": "...code..."
  }
}
```

---

## Constraints

* Do NOT hallucinate routes not discoverable.
* Preserve core functionality.
* Avoid breaking URL semantics unless improving them.

---

## Optional Enhancements

* Generate sitemap
* Add test cases for each route
* Suggest lazy loading or code splitting

---

## Evaluation Criteria

* Completeness of route discovery
* Logical structure
* Code quality
* Scalability of architecture

---

## Execution Summary

1. Crawl → Extract routes
2. Normalize → Deduplicate
3. Classify → Group patterns
4. Infer → Build hierarchy
5. Improve → Redesign routes
6. Generate → Folder + code

---

## End of Skill
